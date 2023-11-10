import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CostCentersService } from './cost-centers.service';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CostCenterEntity } from './entities/cost-center.entity';

@Controller('cost-centers')
@ApiTags('CostCenters')
export class CostCentersController {
  constructor(private readonly costCentersService: CostCentersService) {}

  @Post()
  @ApiCreatedResponse({ type: CostCenterEntity })
  create(@Body() createCostCenterDto: CreateCostCenterDto) {
    return this.costCentersService.create(createCostCenterDto);
  }

  @Get()
  @ApiOkResponse({ type: CostCenterEntity, isArray: true })
  findAll() {
    return this.costCentersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CostCenterEntity })
  findOne(@Param('id') id: string) {
    return this.costCentersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CostCenterEntity })
  update(
    @Param('id') id: string,
    @Body() updateCostCenterDto: UpdateCostCenterDto,
  ) {
    return this.costCentersService.update(id, updateCostCenterDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CostCenterEntity })
  remove(@Param('id') id: string) {
    return this.costCentersService.remove(id);
  }
}
