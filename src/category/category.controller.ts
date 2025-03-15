import { Controller, Get, Post, Body, Patch, Param, Delete, SerializeOptions } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GROUP_CATEGORY, GROUP_TAG } from './entities/category.entity';
import { GROUP_ALL_USERS, GROUP_USER } from '../users/entities/user.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @SerializeOptions({
    groups: [GROUP_TAG, GROUP_CATEGORY, GROUP_USER, GROUP_ALL_USERS],
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
