import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../../common/guards';
import { AdminFaqService } from '../applications/admin-faq.service';
import { FaqCreateDto } from './dto';

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
  async list() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminFaqService.list();

    // 4. Send response
    return { data };
  }
}
