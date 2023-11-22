import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const subcategory = await this.prisma.subcategory.create({
      data: createSubcategoryDto,
    });
    return subcategory;
  }

  async findAll() {
    return await this.prisma.subcategory.findMany();
  }

  async findOne(id: string) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
    return subcategory;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      return await this.prisma.subcategory.update({
        where: { id },
        data: updateSubcategoryDto,
      });
    } catch (error) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.subcategory.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Subcategory with ID ${id} not found`);
    }
  }
}
