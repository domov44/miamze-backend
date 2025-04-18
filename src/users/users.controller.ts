import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  SerializeOptions,
  Patch,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GROUP_ALL_USERS, GROUP_USER, User } from './entities/user.entity';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Recipe } from '../recipes/entities/recipe.entity';
import { RecipesService } from '../recipes/recipes.service';
import { GROUP_CATEGORY } from '../category/entities/category.entity';
import { GROUP_TAG } from '../tags/entities/tag.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly recipesService: RecipesService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('/me')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Current user information retrieved successfully.',
    type: User,
  })
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  async getMe(@Request() req): Promise<User> {
    const userId = req.user.sub;
    return this.usersService.findOneById(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/me/recipes')
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'All recipes of the current user',
    type: [Recipe],
  })
  async getMyRecipes(@Request() req): Promise<Recipe[]> {
    const userId = req.user.sub;
    try {
      const recipes = await this.recipesService.findByUser(userId);
      if (!recipes || recipes.length === 0) {
        throw new NotFoundException('No recipes found for this user');
      }
      return recipes;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'User updated successfully.',
    type: User,
  })
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<User> {
    const currentUserId = req.user.sub;
    return this.usersService.update(+id, updateUserDto, currentUserId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'User deleted successfully',
  })
  async remove(@Param('id') id: string, @Request() req): Promise<{ message: string }> {
    const currentUserId = req.user.sub;
    try {
      await this.usersService.remove(+id, currentUserId);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete user', error);
    }
  }

  @Get(':username')
  @SerializeOptions({
    groups: [GROUP_USER, GROUP_CATEGORY, GROUP_TAG, GROUP_ALL_USERS],
  })
  @ApiCreatedResponse({
    description: 'User and their recipes retrieved successfully',
    type: User,
  })
  async getUserAndRecipes(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException(`User '${username}' not found`);
    }

    const recipes = await this.recipesService.findByUser(user.id);
    user.recipes = recipes;

    return user;
  }
}

