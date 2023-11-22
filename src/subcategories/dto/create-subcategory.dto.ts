import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
} from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ example: 'Viagem' })
  name: string;

  @IsUUID(4)
  @IsNotEmpty()
  @ApiProperty({ example: 'uuid-da-categoria' })
  categoryId: string;
}
