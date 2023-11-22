import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  isPrivate: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  costCenterId: string;
}
