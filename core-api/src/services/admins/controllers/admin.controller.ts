import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from '../applications/admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { Context, ContextKey } from '@common/context';

@ApiTags('[관리자] 관리자 멤버 API')
@Controller('admins')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly context: Context
  ) {}

  /**
   * 본인 정보 조회 API
   * @description 관리자 자기 자신의 정보를 조회합니다.
   */
  @Get('self')
  getSelf() {
    // 1. Destructure body, params, query
    // 2. Get context
    const admin = this.context.get(ContextKey.ADMIN);

    // 3. Get result
    // 4. Send response
    return { data: admin };
  }
}
