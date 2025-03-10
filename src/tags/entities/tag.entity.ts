import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GROUP_ALL_CATEGORIES, GROUP_CATEGORY, Recipe } from '../../recipes/entities/recipe.entity';
import { User } from '../../users/entities/user.entity';

export const GROUP_TAG = 'group_tag_details';
export const GROUP_ALL_TAGS = 'group_all_tags';

@Entity()
export class Tag {
  @ApiProperty({
    description: "Identifiant unique du tag",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  id: number;

  @ApiProperty({
    description: "Date de création du tag",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour du tag",
    example: '2023-10-05T14:00:00Z',
  })  
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_TAG] })
  updatedAt: Date;

  @ApiProperty({
    description: 'Label de tag',
    example: 'Nestjs'
  })
  @Column({ length: 150 })
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  label: string;

  @ApiProperty({
    description: 'Slug de tag',
    example: 'nestjs'
  })
  @Column({ length: 150 })
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS, GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  slug: string;

  @ApiProperty({ type: () => Recipe, isArray: true })
  @ManyToMany(() => Recipe, (recipe) => recipe.tags)
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
  recipes: Recipe[];

  @ApiProperty({ type: () => User, isArray: true })
  @ManyToMany(() => User, (user) => user.tags)
  @Expose({ groups: [GROUP_TAG, GROUP_ALL_TAGS] })
  users: User[];

  constructor(partial: Partial<Tag>) {
    Object.assign(this, partial);
  }
}
