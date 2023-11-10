import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { costCenterId } = createUserDto;
    let costCenterIdToUse: string;

    if (!costCenterId) {
      const costCenter = await this.prisma.costCenter.create({
        data: {},
      });

      costCenterIdToUse = costCenter.id;
    } else {
      // If costCenterId is provided, check if it exists
      const existingCostCenter = await this.prisma.costCenter.findUnique({
        where: { id: costCenterId },
      });

      if (!existingCostCenter) {
        throw new ConflictException('Provided costCenterId does not exist.');
      }

      costCenterIdToUse = costCenterId;
    }

    return this.prisma.user.create({
      data: { ...createUserDto, costCenterId: costCenterIdToUse },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
