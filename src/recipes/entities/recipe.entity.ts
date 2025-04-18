import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Expose } from 'class-transformer';
import { Tag, GROUP_TAG, GROUP_ALL_TAGS } from '../../tags/entities/tag.entity';
import { RecipeIngredient } from '../../recipe-ingredient/entities/recipe-ingredient.entity';
import { Category } from '../../category/entities/category.entity';

export const GROUP_CATEGORY = 'group_category_details';
export const GROUP_ALL_CATEGORIES = 'group_all_categories';

@Entity()
export class Recipe {
  @ApiProperty({
    description: "Identifiant unique de la recette",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  id: number;

  @ApiProperty({
    description: 'Nom de la recette',
    example: 'Tarte aux pommes'
  })
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  label: string;

  @ApiProperty({
    description: 'Chemin image de la recette',
    example: 'https://www.image.com/mon-image.avif'
  })
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  image: string;

  @ApiProperty({
    description: "Date de création de la recette",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour de la recette",
    example: '2023-10-05T14:00:00Z',
  })  
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  updatedAt: Date;

  @ApiProperty({
    description: 'Slug de la recette',
    example: 'tarte-aux-pommes'
  })
  @Column()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  slug: string;

  @ApiProperty({ type: () => Category })
  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => Category, (category) => category.recipes, { nullable: true, onDelete: 'CASCADE' })
  category: Category;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ type: () => Tag, isArray: true })
  @ManyToMany(() => Tag, (tag) => tag.recipes, { cascade: true })
  @JoinTable()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  tags: Tag[];

  @ApiProperty({ type: () => RecipeIngredient, isArray: true })
  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, { cascade: true })
  recipeIngredients: RecipeIngredient[];

   @ApiProperty({
    description: "Étapes de la recette sous forme de JSON",
    example: [
      {
        name: "Préchauffer le four",
        description: "Préchauffer le four à 180°C pendant 20 minutes en chaleur tournante",
        duration: 20,
        preparation: false,
      }
    ],
  })
  @Column('jsonb', { nullable: true })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  steps: { name: string, description: string, duration: number, preparation: boolean }[];

  constructor(partial: Partial<Recipe>) {
    Object.assign(this, partial);
  }
}
