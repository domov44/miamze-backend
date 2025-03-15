import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from '../db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { loadEnvironment } from '../config/configuration';
import { TagsModule } from './tags/tags.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipeIngredientModule } from './recipe-ingredient/recipe-ingredient.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: loadEnvironment(process.env.NODE_ENV),
      load: [configuration],
    }),
    TagsModule,
    RecipesModule,
    IngredientsModule,
    RecipeIngredientModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
  ],
})
export class AppModule { }
