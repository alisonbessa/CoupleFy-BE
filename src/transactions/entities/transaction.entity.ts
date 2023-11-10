import { ApiProperty } from '@nestjs/swagger';
import { CostCenter } from 'src/cost-centers/entities/cost-center.entity';
import { User } from 'src/users/entities/user.entity';

export class Transaction {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  subcategory: string;

  @ApiProperty()
  paymentMethod: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  costCenterId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [User] })
  users?: User;

  @ApiProperty({ type: () => [CostCenter] })
  costCenter?: CostCenter;
}
