import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminHistoryService } from '../applications/admin-history.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';

@ApiTags('[관리자] 변경 이력 히스토리')
@Controller('admins/histories')
@UseGuards(AdminGuard)
export class AdminHistoryController {
  constructor(private readonly adminHistoryService: AdminHistoryService) {}

  /**
   * 변경 이력 히스토리 목록 조회
   */
  @Get()
  async list() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminHistoryService.list({});

    // 4. Send response
    return { data };
  }
}
