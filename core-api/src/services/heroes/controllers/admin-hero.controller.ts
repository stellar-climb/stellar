import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminHeroService } from '../applications/admin-hero.service';
import { AdminHeroCreateDto, AdminHeroQueryDto } from './dto';
import { AdminGuard } from '../../../common/guards';

@ApiTags('[관리자] 히어로 API')
@Controller('/admins/heroes')
@UseGuards(AdminGuard)
export class AdminHeroController {
  constructor(private readonly adminHeroService: AdminHeroService) {}

  /**
   * 히어로 생성
   */
  @Post()
  async create(@Body() body: AdminHeroCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminHeroService.create(body);

    // 4. Send response
    return { data: {} };
  }

  /**
   * 히어로 목록 조회
   */
  @Get()
  async list(@Query() query: AdminHeroQueryDto) {
    // 1. Destructure body, params, query
    const { type, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminHeroService.list({ type }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 히어로 상세 조회
   */
  @Get(':id')
  async retrieve(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminHeroService.retrieve({ id });

    // 4. Send response
    return { data };
  }
}
