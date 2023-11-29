import { ApiProperty } from '@nestjs/swagger';

export class SubcategoryEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  primaryUserWeight: number;

  @ApiProperty()
  secondaryUserWeight: number;
}
