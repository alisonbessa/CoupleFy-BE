import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({ data: createTransactionDto });
  }

  findAll(costCenterId: string) {
    return this.prisma.transaction.findMany({
      where: { costCenterId },
    });
  }

  findOne(transactionId: string) {
    return this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
  }

  // TODO: Create a service to get transactions from a specific month

  // TODO: Create a service to get transactions by category

  // TODO: Create a service to get transactions by category for a specific month

  // TODO: Create a service to create many transactions at a time

  update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id: transactionId },
      data: updateTransactionDto,
    });
  }

  remove(transactionId: string) {
    return this.prisma.transaction.delete({
      where: { id: transactionId },
    });
  }
}
