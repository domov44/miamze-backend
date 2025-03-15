import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class RecipeIngredientDto {
  @IsNotEmpty()
  ingredientId: number;

  @IsString()
  quantity: string;
}

class StepDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  preparation: boolean;
}

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;  

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  recipeIngredients: RecipeIngredientDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps?: StepDto[];
}
