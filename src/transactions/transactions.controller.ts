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

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Post('/createMany')
  createMany(@Body(ValidationPipe) transactions: CreateTransactionDto[]) {
    return this.transactionsService.createMany(transactions);
  }

  @Get()
  findAll(@Param('costCenterId') costCenterId: string) {
    return this.transactionsService.findAll(costCenterId);
  }

  @Get(':transactionId')
  findOne(@Param('transactionId') transactionId: string) {
    return this.transactionsService.findOne(transactionId);
  }

  @Patch(':transactionId')
  update(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  remove(@Param('transactionId') transactionId: string) {
    return this.transactionsService.remove(transactionId);
  }
}
