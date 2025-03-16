import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeIngredient } from '../recipe-ingredient/entities/recipe-ingredient.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient, Ingredient, Category])],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}

