import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminHeroService } from '../applications/admin-hero.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { HeroCreateDto } from './dto';

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
  async list() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
    return { data: {} };
  }
}
