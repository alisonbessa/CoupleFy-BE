import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class CreateTransactionBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  @ApiProperty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  subcategory?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  paymentMethod: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'Date must be in YYYY-MM format' })
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-12',
    format: 'YYYY-MM',
    required: false,
    nullable: true,
  })
  date: string;
}

export class CreateTransactionDto extends CreateTransactionBodyDto {
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  costCenterId: string;
}
