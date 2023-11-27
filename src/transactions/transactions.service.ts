import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetTransactionsQuery } from './dto/get-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: createTransactionDto,
    });

    const author = await this.prisma.user.findUnique({
      where: { id: createTransactionDto.authorId },
    });
    const partnerId = author.partnerId;

    let primaryUserWeight = createTransactionDto.primaryUserWeight;
    let secondaryUserWeight = createTransactionDto.secondaryUserWeight;

    if (primaryUserWeight === undefined || secondaryUserWeight === undefined) {
      const category = await this.prisma.category.findUnique({
        where: { id: createTransactionDto.categoryId },
      });

      primaryUserWeight = primaryUserWeight ?? category.primaryUserWeight;
      secondaryUserWeight = secondaryUserWeight ?? category.secondaryUserWeight;
    }

    await this.prisma.userTransaction.createMany({
      data: [
        {
          userId: author.id,
          transactionId: transaction.id,
          userWeight: primaryUserWeight,
        },
        {
          userId: partnerId,
          transactionId: transaction.id,
          userWeight: secondaryUserWeight,
        },
      ],
    });

    return transaction;
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
