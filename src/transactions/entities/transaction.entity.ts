import { ApiProperty } from '@nestjs/swagger';
import { CostCenterEntity } from 'src/cost-centers/entities/cost-center.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class TransactionEntity {
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

  @ApiProperty({ required: false, nullable: true })
  subcategory: string | null;

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

  @ApiProperty({ type: () => [UserEntity] })
  users?: UserEntity;

  @ApiProperty({ type: () => [CostCenterEntity] })
  costCenter?: CostCenterEntity;
}
