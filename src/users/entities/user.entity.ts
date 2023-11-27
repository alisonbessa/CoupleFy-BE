import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CostCenterEntity } from 'src/cost-centers/entities/cost-center.entity';
export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  costCenterId?: string;

  @ApiProperty()
  isPrimaryUser: boolean;

  @ApiProperty()
  partnerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, type: CostCenterEntity })
  costCenter?: CostCenterEntity;

  constructor({ costCenter, ...data }: Partial<UserEntity>) {
    Object.assign(this, data);

    if (costCenter) {
      this.costCenter = new UserEntity(costCenter);
    }
  }
}
