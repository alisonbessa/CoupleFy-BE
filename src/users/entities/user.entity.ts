import { ApiProperty } from '@nestjs/swagger';
import { CostCenter } from 'src/cost-centers/entities/cost-center.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  costCenterId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [CostCenter] })
  costCenter?: CostCenter;

  @ApiProperty({ type: () => [Transaction] })
  transactions?: Transaction[];
}
