import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import slugify from 'slugify';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) { }

  async create(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
    let slug = slugify(createRecipeDto.label, { lower: true });

    let originalSlug = slug;
    let counter = 2;

    while (await this.recipeRepository.findOne({ where: { slug: slug } })) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    const recipe = this.recipeRepository.create({
      label: createRecipeDto.label,
      slug: slug,
      user,
    });

    await this.recipeRepository.save(recipe);

    const recipeIngredients = [];

    for (const ri of createRecipeDto.recipeIngredients) {
      try {
        const ingredient = await this.ingredientRepository.findOne({ where: { id: ri.ingredientId } });
        if (!ingredient) {
          console.warn(`Ingredient ID ${ri.ingredientId} not found. Skipping...`);
          continue;
        }

        const recipeIngredient = this.recipeIngredientRepository.create({
          recipe,
          ingredient,
          quantity: ri.quantity,
        });

        recipeIngredients.push(recipeIngredient);
      } catch (error) {
        console.error(`Error processing ingredient ID ${ri.ingredientId}: ${error.message}`);
      }
    }

    if (recipeIngredients.length > 0) {
      await this.recipeIngredientRepository.save(recipeIngredients);
    }

    if (createRecipeDto.steps && createRecipeDto.steps.length > 0) {
      recipe.steps = createRecipeDto.steps;
      await this.recipeRepository.save(recipe);
    }

    return this.recipeRepository.findOne({
      where: { id: recipe.id },
      relations: ['user', 'recipeIngredients', 'recipeIngredients.ingredient'],
    });
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({ relations: ['user', 'recipeIngredients', 'recipeIngredients.ingredient'] });
  }

  async findOneByUsernameAndSlug(username: string, slug: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: {
        slug,
        user: { username },
      },
      relations: ['user', 'recipeIngredients', 'recipeIngredients.ingredient'],
    });

    if (!recipe) throw new NotFoundException(`Recipe '${slug}' by '${username}' not found`);

    return recipe;
  }


  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id }, relations: ['user', 'recipeIngredients', 'recipeIngredients.ingredient'] });
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto, user: User): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id }, relations: ['user'] });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.user.id !== user.id) throw new ForbiddenException('You are not allowed to update this recipe');

    await this.recipeRepository.update(id, updateRecipeDto);
    return this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    const recipe = await this.recipeRepository.findOne({ where: { id }, relations: ['user'] });
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.user.id !== user.id) throw new ForbiddenException('You are not allowed to delete this recipe');

    await this.recipeRepository.remove(recipe);
  }
}

