import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Expose } from 'class-transformer';
  import { Recipe } from '../../recipes/entities/recipe.entity';
  
  export const GROUP_TAG = 'group_tag_details';
  export const GROUP_ALL_TAGS = 'group_all_tags';
  export const GROUP_CATEGORY = 'group_category';
  export const GROUP_ALL_CATEGORIES = 'group_all_categories';
  
  @Entity()
  export class Category {
    @ApiProperty({ description: "Identifiant unique de la catégorie", example: 1 })
    @PrimaryGeneratedColumn()
    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
    id: number;
  
    @ApiProperty({ description: "Date de création de la catégorie", example: '2023-10-01T10:00:00Z' })
    @CreateDateColumn({ name: 'created_at' })
    @Expose({ groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
    createdAt: Date;
  
    @ApiProperty({ description: "Date de dernière mise à jour de la catégorie", example: '2023-10-05T14:00:00Z' })
    @UpdateDateColumn({ name: 'updated_at' })
    @Expose({ groups: [GROUP_TAG] })
    updatedAt: Date;
  
    @ApiProperty({ description: 'Label de la catégorie', example: 'Déssert' })
    @Column({ length: 150 })
    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
    label: string;
  
    @ApiProperty({ description: 'Slug de la catégorie', example: 'dessert' })
    @Column({ length: 150, unique: true })
    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
    slug: string;
  
    @ApiProperty({ type: () => Recipe, isArray: true })
    @OneToMany(() => Recipe, (recipe) => recipe.category)
    @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
    recipes: Recipe[];
  
    constructor(partial: Partial<Category>) {
      Object.assign(this, partial);
    }
  }  