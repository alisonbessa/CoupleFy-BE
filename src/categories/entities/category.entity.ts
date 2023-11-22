import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({ example: 'uuid-da-categoria' })
  id: string;

  @ApiProperty({ example: 'Alimentação' })
  name: string;

  @ApiProperty({ example: true })
  isPrivate: boolean;

  @ApiProperty({ example: 'uuid-do-centro-de-custos' })
  costCenterId: string;
}
