import { Controller, Get, Post, Body, Query, UseGuards, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminSeriesService } from '../applications/admin-series.service';
import { AdminGuard } from '@common/guards';
import { SeriesChangeOpenDto, SeriesCreateDto, SeriesQueryDto, SeriesUpdateDto } from './dto';

@ApiTags('[관리자] 시리즈 API')
@Controller('admins/series')
@UseGuards(AdminGuard)
export class AdminSeriesController {
  constructor(private readonly adminSeriesService: AdminSeriesService) {}

  /**
   * 시리즈 생성
   */
  @Post()
  async create(@Body() body: SeriesCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminSeriesService.create({ ...body });

    // 4. Send response
    return { data: {} };
  }

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

  /**
   * 시리즈 조회
   */
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminSeriesService.retrieve({ id });

    // 4. Send response
    return { data };
  }

  /**
   * 시리즈 수정
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: SeriesUpdateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminSeriesService.update({ id, ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 시리즈 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminSeriesService.remove({ id });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 시리즈 공개/비공개 변경
   */
  @Put(':id/open')
  async changeOpen(@Param('id', ParseIntPipe) id: number, @Body() body: SeriesChangeOpenDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminSeriesService.changeOpen({ id, ...body });

    // 4. Send response
    return { data: {} };
  }
}
