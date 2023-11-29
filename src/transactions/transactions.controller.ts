import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionBodyDto,
  CreateTransactionDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: TransactionEntity })
  create(
    @Body() createTransactionDto: CreateTransactionBodyDto,
    @User() user: UserEntity,
  ) {
    return this.transactionsService.create({
      ...createTransactionDto,
      authorId: user.id,
      costCenterId: user.costCenterId,
    });
  }

  @Post('/createMany')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: TransactionEntity, isArray: true })
  createMany(
    @Body(ValidationPipe) transactions: CreateTransactionDto[],
    @User() user: UserEntity,
  ) {
    const transactionsWithCostCenter = transactions.map((transaction) => ({
      ...transaction,
      costCenterId: user.costCenter.id,
      authorId: user.id,
    }));

    return this.transactionsService.createMany(transactionsWithCostCenter);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @User() user: UserEntity,
    @Query('categoryId') categoryId: string,
    @Query('date') date?: string,
  ) {
    return this.transactionsService.findAllByCostCenter(
      user.costCenter.id,
      date,
      categoryId,
    );
  }

  @Get(':transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TransactionEntity })
  findOne(
    @Param('transactionId') transactionId: string,
    @User() user: UserEntity,
  ) {
    return this.transactionsService.findOne(transactionId, user.costCenter.id);
  }

  @Patch(':transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TransactionEntity })
  update(
    @Param('transactionId') transactionId: string,
    @User() user: UserEntity,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(transactionId, user.costCenter.id, {
      ...updateTransactionDto,
      costCenterId: user.costCenter.id,
      authorId: user.id,
    });
  }

  @Delete(':transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TransactionEntity })
  remove(
    @Param('transactionId') transactionId: string,
    @User() user: UserEntity,
  ) {
    return this.transactionsService.remove(transactionId, user.costCenter.id);
  }
}
