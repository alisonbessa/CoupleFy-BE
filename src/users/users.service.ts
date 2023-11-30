import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

const hashingRounds = parseInt(process.env.HASHING_ROUNDS, 10) || 10;
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
    let partnerIdToUse: string;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      hashingRounds,
    );
    createUserDto.password = hashedPassword;

    const isPrimaryUser = !costCenterId;

    if (isPrimaryUser) {
      const costCenter = await this.prisma.costCenter.create({ data: {} });
      costCenterIdToUse = costCenter.id;
    } else {
      const existingCostCenter = await this.prisma.costCenter.findUnique({
        where: { id: costCenterId },
        include: { user: true },
      });

      if (!existingCostCenter) {
        throw new ConflictException('Provided costCenterId does not exist.');
      }

      costCenterIdToUse = costCenterId;
      partnerIdToUse = existingCostCenter.user[0].id;
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        costCenterId: costCenterIdToUse,
        isPrimaryUser,
        partnerId: partnerIdToUse || null,
      },
    });

    if (!isPrimaryUser) {
      await this.prisma.user.update({
        where: { id: partnerIdToUse },
        data: { partnerId: newUser.id },
      });
    }

    return newUser;
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
        hashingRounds,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        costCenterId: undefined,
        isPrimaryUser: undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
