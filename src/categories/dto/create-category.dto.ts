import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCategoryBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  isPrivate: boolean;

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

export class CreateCategoryDto extends CreateCategoryBodyDto {
  @IsUUID()
  @IsNotEmpty()
  costCenterId: string;
}
