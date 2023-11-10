import { ApiProperty } from '@nestjs/swagger';

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
}
