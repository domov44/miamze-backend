import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { UsersModule } from 'src/users/users.module';
import { Tag } from './entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    UsersModule,
    RecipesModule
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService, TypeOrmModule],
})
export class TagsModule {}
