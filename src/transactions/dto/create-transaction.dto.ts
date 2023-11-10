import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class CreateTransactionDto {
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
  @IsNotEmpty()
  @ApiProperty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  costCenterId: string;
}
