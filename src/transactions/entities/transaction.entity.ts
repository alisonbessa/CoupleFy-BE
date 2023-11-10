import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
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
}
