import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientDto {
  @ApiProperty({ description: "Nom de l'ingrédient", example: "Farine" })
  @IsString()
  @IsNotEmpty()
  name: string;
}
