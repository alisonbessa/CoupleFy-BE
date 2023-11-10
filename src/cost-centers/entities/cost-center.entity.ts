import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';

export class CostCenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [Transaction] })
  transactions?: Transaction[];

  @ApiProperty({ type: () => [User] })
  users?: User[];
}
