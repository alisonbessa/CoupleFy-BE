import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
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
}

export class CreateCategoryDto extends CreateCategoryBodyDto {
  @IsUUID()
  @IsNotEmpty()
  costCenterId: string;
}
