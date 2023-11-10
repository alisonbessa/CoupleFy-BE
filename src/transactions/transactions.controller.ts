import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiCreatedResponse({ type: TransactionEntity })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Post('/createMany')
  @ApiCreatedResponse({ type: TransactionEntity, isArray: true })
  createMany(@Body(ValidationPipe) transactions: CreateTransactionDto[]) {
    return this.transactionsService.createMany(transactions);
  }

  @Get()
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  findAll(@Param('costCenterId') costCenterId: string) {
    return this.transactionsService.findAll(costCenterId);
  }

  @Get(':transactionId')
  @ApiOkResponse({ type: TransactionEntity })
  findOne(@Param('transactionId') transactionId: string) {
    return this.transactionsService.findOne(transactionId);
  }

  @Patch(':transactionId')
  @ApiOkResponse({ type: TransactionEntity })
  update(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  @ApiOkResponse({ type: TransactionEntity })
  remove(@Param('transactionId') transactionId: string) {
    return this.transactionsService.remove(transactionId);
  }
}
