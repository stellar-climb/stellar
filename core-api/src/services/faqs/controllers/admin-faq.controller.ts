import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { AdminFaqService } from '../applications/admin-faq.service';
import { FaqCreateDto, AdminFaqQueryDto } from './dto';

@ApiTags('[관리자] FAQ API')
@Controller('admins/faqs')
@UseGuards(AdminGuard)
export class AdminFaqController {
  constructor(private readonly adminFaqService: AdminFaqService) {}

  /**
   * FAQ 생성
   */
  @Post()
  async create(@Body() body: FaqCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminFaqService.create({ ...body });

    // 4. Send response
    return { data };
  }

  /**
   * FAQ 목록 조회
   */
  @Get()
  async list(@Query() query: AdminFaqQueryDto) {
    // 1. Destructure body, params, query
    const { search, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminFaqService.list({ search, searchValue }, options);

    // 4. Send response
    return { data };
  }

  /**
   * FAQ 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminFaqService.remove({ id });

    // 4. Send response
    return { data };
  }
}
