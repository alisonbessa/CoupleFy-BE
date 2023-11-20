import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CostCentersService } from './cost-centers.service';
import { CreateCostCenterDto } from './dto/create-cost-center.dto';
import { UpdateCostCenterDto } from './dto/update-cost-center.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CostCenterEntity } from './entities/cost-center.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';

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
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CostCenterEntity, isArray: true })
  findOne(@User() user: UserEntity) {
    return this.costCentersService.findOne(user.costCenter.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CostCenterEntity })
  update(
    @Body() updateCostCenterDto: UpdateCostCenterDto,
    @User() user: UserEntity,
  ) {
    return this.costCentersService.update(
      user.costCenter.id,
      updateCostCenterDto,
    );
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CostCenterEntity })
  remove(@User() user: UserEntity) {
    return this.costCentersService.remove(user.costCenter.id);
  }
}
