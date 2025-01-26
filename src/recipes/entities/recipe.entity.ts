import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';
import { Tag, GROUP_TAG, GROUP_ALL_TAGS } from 'src/tags/entities/tag.entity';

export const GROUP_CATEGORY = 'group_category_details';
export const GROUP_ALL_CATEGORIES = 'group_all_categories';

@Entity()
export class Recipe {
  @ApiProperty({
    description: "Identifiant unique de la catégorie",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  id: number;

  @ApiProperty({
    description: 'Label de la catégorie',
    example: 'Code'
  })
  @Column({ length: 500 })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  label: string;

  @ApiProperty({
    description: "Date de création de la catégorie",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour de la catégorie",
    example: '2023-10-05T14:00:00Z',
  })  
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_CATEGORY] })
  updatedAt: Date;

  @ApiProperty({
    description: 'Slug de la catégorie',
    example: 'code'
  })
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  slug: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.recipes)
  @Exclude()
  user: User;

  @ApiProperty({ type: () => Tag, isArray: true })
  @ManyToMany(() => Tag, (tag) => tag.recipes)
  @JoinTable()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  tags: Tag[];

  constructor(partial: Partial<Recipe>) {
    Object.assign(this, partial);
  }
}
