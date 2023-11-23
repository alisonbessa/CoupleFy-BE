import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTransactionsQuery } from './dto/get-transactions.dto';

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

  findAllByCostCenter(
    costCenterId: string,
    date?: string,
    categoryId?: string,
  ) {
    let query: GetTransactionsQuery = { costCenterId };

    if (date) {
      query = { ...query, date };
    }

    if (categoryId) {
      query = { ...query, categoryId };
    }

    return this.prisma.transaction.findMany({
      where: query,
    });
  }

  findOne(transactionId: string, costCenterId: string) {
    return this.prisma.transaction.findUnique({
      where: { id: transactionId, costCenterId },
    });
  }

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
