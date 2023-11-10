import { ApiProperty } from '@nestjs/swagger';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class CostCenterEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [TransactionEntity] })
  transactions?: TransactionEntity[];

  @ApiProperty({ type: () => [UserEntity] })
  users?: UserEntity[];
}
