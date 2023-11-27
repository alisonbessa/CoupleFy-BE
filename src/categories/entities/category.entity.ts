import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ example: true })
  isPrivate: boolean;

  @ApiProperty()
  primaryUserWeight: number;

  @ApiProperty()
  secondaryUserWeight: number;

  @ApiProperty()
  costCenterId: string;
}
