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
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @User() user: UserEntity,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(user.costCenter.id, createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: UserEntity) {
    return this.categoriesService.findAll(user.costCenter.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@User() user: UserEntity, @Param('id') id: string) {
    return this.categoriesService.findOne(user.costCenter.id, id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @User() user: UserEntity,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(
      user.costCenter.id,
      id,
      updateCategoryDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@User() user: UserEntity, @Param('id') id: string) {
    return this.categoriesService.remove(user.costCenter.id, id);
  }
}
