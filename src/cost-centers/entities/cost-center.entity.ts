import { ApiProperty } from '@nestjs/swagger';

export class CostCenterEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
