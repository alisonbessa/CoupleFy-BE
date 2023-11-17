import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
  
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }
    
    const { costCenterId } = createUserDto;
    let costCenterIdToUse: string;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      process.env.HASHING_ROUNDS,
    );

    createUserDto.password = hashedPassword;

    if (!costCenterId) {
      const costCenter = await this.prisma.costCenter.create({
        data: {},
      });

      costCenterIdToUse = costCenter.id;
    } else {
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
    return this.prisma.user.findMany({
      include: {
        costCenter: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        costCenter: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        process.env.HASHING_ROUNDS,
      );
    }

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
