import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminSeriesService } from '../applications/admin-series.service';
import { AdminGuard } from '@common/guards';
import { SeriesQueryDto } from './dto';

@ApiTags('[관리자] 시리즈 API')
@Controller('admins/series')
@UseGuards(AdminGuard)
export class AdminSeriesController {
  constructor(private readonly adminSeriesService: AdminSeriesService) {}

  /**
   * 시리즈 목록 조회
   */
  @Get()
  async list(@Query() query: SeriesQueryDto) {
    // 1. Destructure body, params, query
    const { search, searchValue, makingType, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminSeriesService.list({ search, searchValue, makingType }, options);

    // 4. Send response
    return { data };
  }
}
