import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) { }


  async create(createRecipeDto: CreateRecipeDto, userId: number, tags: Tag[]): Promise<Recipe> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }


    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      user,
    });

    return this.recipeRepository.save(recipe);
  }


  async findAll(userId: number): Promise<Recipe[]> {
    return this.recipeRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'tags'],
    });
  }

  async findOne(id: number, userId: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['user', 'tags'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to view this recipe.",
      );
    }

    return recipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    userId: number,
    tags: Tag[],
  ): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['user', 'tags'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to update this recipe.",
      );
    }

    let tagsToUse: Tag[];

    recipe.label = updateRecipeDto.label;
    recipe.slug = updateRecipeDto.slug;
    recipe.tags = tagsToUse;

    return this.recipeRepository.save(recipe);
  }



  async remove(id: number, userId: number): Promise<void> {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.user.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to delete this recipe.",
      );
    }

    await this.recipeRepository.delete(id);
  }
}
