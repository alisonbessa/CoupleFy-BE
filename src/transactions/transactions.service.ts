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

  createMany(transactions: CreateTransactionDto[]) {
    return this.prisma.transaction.createMany({
      data: transactions,
    });
  }

  findAll(costCenterId: string) {
    return this.prisma.transaction.findMany({
      where: { costCenterId },
    });
  }

  findAllByCostCenter(costCenterId: string) {
    return this.prisma.transaction.findMany({
      where: { costCenterId },
    });
  }

  findOne(transactionId: string, costCenterId: string) {
    return this.prisma.transaction.findUnique({
      where: { id: transactionId, costCenterId },
    });
  }

  // TODO: Create a service to get transactions from a specific month
  // The schema should be updated before, to add a date field or year and month fields

  // TODO: Create a service to get transactions by category

  // TODO: Create a service to get transactions by category for a specific month
  // The schema should be updated before, to add a date field or year and month fields

  update(
    transactionId: string,
    costCenterId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.prisma.transaction.update({
      where: { id: transactionId, costCenterId },
      data: updateTransactionDto,
    });
  }

  remove(transactionId: string, costCenterId: string) {
    return this.prisma.transaction.delete({
      where: { id: transactionId, costCenterId },
    });
  }
}
