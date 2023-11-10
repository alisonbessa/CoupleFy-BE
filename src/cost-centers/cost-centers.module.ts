import { Module } from '@nestjs/common';
import { CostCentersService } from './cost-centers.service';
import { CostCentersController } from './cost-centers.controller';

@Module({
  controllers: [CostCentersController],
  providers: [CostCentersService],
})
export class CostCentersModule {}
