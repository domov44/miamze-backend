import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { IsArray, IsInt, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({
    description: 'Label de la catégorie',
    example: 'Code'
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Slug de la catégorie',
    example: 'code'
  })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Le slug doit être en minuscules et ne contenir que des lettres, chiffres et tirets'
  })
  slug: string;

  @ApiProperty({
    type: () => [Tag],
    required: false,
    description: 'Tags liés à la catégorie',
    example: [1, 2, 3]
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags: Tag[];
}
