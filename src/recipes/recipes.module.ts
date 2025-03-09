import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesService } from 'src/recipes/recipes.service';
import { RecipesController } from 'src/recipes/recipes.controller';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { RecipeIngredient } from 'src/recipe-ingredient/entities/recipe-ingredient.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}

