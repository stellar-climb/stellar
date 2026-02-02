import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AdminHeroService } from '../applications/admin-hero.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { HeroCreateDto, HeroQueryDto } from './dto';

@ApiTags('[관리자] 히어로 API')
@Controller('admins/heros')
@UseGuards(AdminGuard)
export class AdminHeroController {
  constructor(private readonly adminHeroService: AdminHeroService) {}

  /**
   * 히어로 생성
   */
  @Post()
  async create(@Body() body: HeroCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminHeroService.create({ ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 히어로 목록 조회
   */
  @Get()
  async list(@Query() query: HeroQueryDto) {
    // 1. Destructure body, params, query
    const { type, status, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminHeroService.list({ type, status }, options);

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

  /**
   * 히어로 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminHeroService.remove({ id });

    // 4. Send response
    return { data: {} };
  }
}
