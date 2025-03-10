import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RecipeIngredient } from '../../recipe-ingredient/entities/recipe-ingredient.entity';

@Entity()
export class Ingredient {
  @ApiProperty({ description: "ID unique de l'ingrédient", example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Nom de l'ingrédient", example: "Farine" })
  @Column({ length: 255 })
  @Expose()
  name: string;

  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.ingredient, { cascade: true })
  @ApiProperty({ type: () => RecipeIngredient, isArray: true })
  recipeIngredients: RecipeIngredient[];
}
