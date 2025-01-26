import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  SerializeOptions,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, GROUP_ALL_CATEGORIES, GROUP_CATEGORY } from './entities/recipe.entity';
import { ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Tag } from 'src/tags/entities/tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('recipes')
@ApiTags('Recipes')
export class RecipesController {
  constructor(private readonly RecipesService: RecipesService,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,) { }

  @UseGuards(AuthGuard)
  @Get()
  @SerializeOptions({
    groups: [GROUP_ALL_CATEGORIES],
  })
  async findAll(
    @Request() req,
  ): Promise<Recipe[]> {
    const userId = req.user.sub;
    return this.RecipesService.findAll(userId);
  }
  
  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Recipe created successfully and linked to the user.',
    type: Recipe,
  })
  @SerializeOptions({
    groups: [GROUP_CATEGORY],
  })
  async create(@Body() createCategoryDto: CreateRecipeDto, @Request() req) {
    const userId = req.user.sub;

    const foundTags = await this.tagRepository.findBy({
      id: In(createCategoryDto.tags),
    });

    return this.RecipesService.create(createCategoryDto, userId, foundTags);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_CATEGORY],
  })
  async findOne(@Param('id') id: string, @Request() req): Promise<Recipe> {
    const userId = req.user.sub;
    return this.RecipesService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @SerializeOptions({
    groups: [GROUP_CATEGORY],
  })
  @ApiCreatedResponse({
    description: 'Recipe updated successfully.',
    type: Recipe,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    const tags: Tag[] = updateRecipeDto.tags;
    return this.RecipesService.update(+id, updateRecipeDto, userId, tags);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @SerializeOptions({
    groups: [GROUP_CATEGORY],
  })
  @ApiCreatedResponse({
    description: 'Recipe deleted successfully.',
    type: Recipe,
  })
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.RecipesService.remove(+id, userId);
  }
}
