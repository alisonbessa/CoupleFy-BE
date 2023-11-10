import { ApiProperty } from '@nestjs/swagger';
export class CreateTransactionDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

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
