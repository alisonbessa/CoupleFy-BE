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
  IsUUID,
} from 'class-validator';

export class CreateTransactionBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
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

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  subcategoryId?: string;

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
  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ required: false })
  authorId: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ required: false })
  costCenterId: string;
}
