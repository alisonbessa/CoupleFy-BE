import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(costCenterId: string, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        costCenterId,
      },
    });
  }

  findAll(costCenterId: string) {
    return this.prisma.category.findMany({
      where: { costCenterId },
    });
  }

  findOne(costCenterId: string, id: string) {
    return this.prisma.category.findFirst({
      where: { id, costCenterId },
    });
  }

  update(
    costCenterId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
        costCenterId,
      },
    });
  }

  remove(costCenterId: string, id: string) {
    return this.prisma.category.delete({
      where: { id, costCenterId },
    });
  }
}
