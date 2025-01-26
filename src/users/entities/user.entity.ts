import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { GROUP_ALL_CATEGORIES, GROUP_CATEGORY, Recipe } from 'src/recipes/entities/recipe.entity';
import { GROUP_ALL_TAGS, GROUP_TAG, Tag } from 'src/tags/entities/tag.entity';

export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USERS = 'group_all_users';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @ApiProperty({
    description: "Date de création de l'utilisateur",
    example: '2023-10-01T10:00:00Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  @Expose({ groups: [GROUP_USER] })
  createdAt: Date;

  @ApiProperty({
    description: "Date de dernière mise à jour de l'utilisateur",
    example: '2023-10-05T14:00:00Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  @Expose({ groups: [GROUP_USER] })
  updatedAt: Date;

  @ApiProperty({
    description: "Identifiant unique de l'utilisateur",
    example: 1,
  })
  @PrimaryGeneratedColumn()
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  id: number;

  @ApiProperty({
    description: "Nom d'utilisateur unique",
    example: 'john_doe'
  })
  @Column({ length: 25, nullable: false })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  username: string;

  @ApiProperty({
    description: "Unique user email",
    example: 'johndoe@gmail.com'
  })
  @Column({ length: 50, nullable: false })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  email: string;

  @ApiProperty({
    description: "Prénom de l''utilisateur",
    example: 'john'
  })
  @Column({ length: 50, nullable: false })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  name: string;

  @ApiProperty({
    description: "Nom de l''utilisateur",
    example: 'Doe'
  })
  @Column({ length: 50, nullable: false })
  @Expose({ groups: [GROUP_USER, GROUP_ALL_USERS] })
  surname: string;

  @Exclude()
  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'fjsdf7dskdsqkjd'
  })
  @Column({ length: 150, nullable: false })
  password: string;

  @Exclude()
  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  @ApiProperty({ type: () => Tag, isArray: true })
  @ManyToMany(() => Tag, (tag) => tag.users)
  @JoinTable()
  @Expose({ groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES, GROUP_TAG, GROUP_ALL_TAGS] })
  tags: Tag[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
