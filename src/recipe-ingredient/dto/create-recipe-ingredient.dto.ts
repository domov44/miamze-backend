import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeIngredientDto {
    @IsNumber()
    @IsNotEmpty()
    recipeId: number;

    @IsNumber()
    @IsNotEmpty()
    ingredientId: number;

    @IsString()
    @IsNotEmpty()
    quantity: string;
}
