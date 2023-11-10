import { ApiProperty } from '@nestjs/swagger';
import { CostCenterEntity } from 'src/cost-centers/entities/cost-center.entity';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';

export class UserEntity {
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

  @ApiProperty({ type: () => [CostCenterEntity] })
  costCenter?: CostCenterEntity;

  @ApiProperty({ type: () => [TransactionEntity] })
  transactions?: TransactionEntity[];
}
