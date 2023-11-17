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
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: TransactionEntity })
  create(@Body() createTransactionDto: CreateTransactionDto, @User() user) {
    return this.transactionsService.create({
      ...createTransactionDto,
      costCenterId: user.costCenter.id,
      authorId: user.id,
    });
  }

  @Post('/createMany')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: TransactionEntity, isArray: true })
  createMany(
    @Body(ValidationPipe) transactions: CreateTransactionDto[],
    @User() user,
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
  async findAll(@User() user) {
    console.log('user:', user);
    return this.transactionsService.findAllByCostCenter(user.costCenter.id);
  }

  @Get(':transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TransactionEntity })
  findOne(@Param('transactionId') transactionId: string, @User() user) {
    return this.transactionsService.findOne(transactionId, user.costCenter.id);
  }

  @Patch(':transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TransactionEntity })
  update(
    @Param('transactionId') transactionId: string,
    @User() user,
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
  remove(@Param('transactionId') transactionId: string, @User() user) {
    return this.transactionsService.remove(transactionId, user.costCenter.id);
  }
}
