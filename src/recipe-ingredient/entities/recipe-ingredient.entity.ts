import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';


@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Recipe })
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Ingredient })
  ingredient: Ingredient;

  @ApiProperty({ description: "Quantité de l'ingrédient dans la recette", example: "200g" })
  @Column()
  quantity: string;
}
