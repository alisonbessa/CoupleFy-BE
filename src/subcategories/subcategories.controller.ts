import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('subcategories')
@ApiTags('Subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    return await this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<SubcategoryEntity[]> {
    return await this.subcategoriesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<SubcategoryEntity> {
    return await this.subcategoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    return await this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.subcategoriesService.remove(id);
  }
}
