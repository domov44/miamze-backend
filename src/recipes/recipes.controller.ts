import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, SerializeOptions } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { GROUP_CATEGORY } from './entities/recipe.entity';
import { GROUP_ALL_USERS, GROUP_USER } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { GROUP_TAG } from '../tags/entities/tag.entity';


@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @UseGuards(AuthGuard)
  @Post()
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  create(@Body() createRecipeDto: CreateRecipeDto, @Request() req) {
    console.log(createRecipeDto)
    return this.recipesService.create(createRecipeDto, req.user.sub);
  }

  @Get()
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':username/:slug')
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  async findOneByUsernameAndSlug(
    @Param('username') username: string,
    @Param('slug') slug: string
  ) {
    return this.recipesService.findOneByUsernameAndSlug(username, slug);
  }


  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto, @Request() req) {
    return this.recipesService.update(+id, updateRecipeDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.recipesService.remove(+id, req.user.sub);
  }
}
