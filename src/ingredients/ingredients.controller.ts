import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Créer un nouvel ingrédient' })
  @ApiResponse({ status: 201, description: 'Ingrédient créé avec succès.' })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les ingrédients' })
  @ApiResponse({ status: 200, description: 'Liste des ingrédients retournée avec succès.' })
  findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un ingrédient par son ID' })
  @ApiResponse({ status: 200, description: 'Ingrédient trouvé.' })
  findOne(@Param('id') id: number) {
    return this.ingredientService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un ingrédient' })
  @ApiResponse({ status: 200, description: 'Ingrédient mis à jour avec succès.' })
  update(@Param('id') id: number, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un ingrédient' })
  @ApiResponse({ status: 200, description: 'Ingrédient supprimé avec succès.' })
  remove(@Param('id') id: number) {
    return this.ingredientService.remove(id);
  }
}