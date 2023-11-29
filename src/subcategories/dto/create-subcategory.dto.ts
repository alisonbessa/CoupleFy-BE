import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ default: 50 })
  primaryUserWeight: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({ default: 50 })
  secondaryUserWeight: number;
}
