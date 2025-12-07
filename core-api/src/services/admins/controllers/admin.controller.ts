import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from '../applications/admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { Context, ContextKey } from '@common/context';
import { AdminQueryDto, AdminResponseDto } from './dto';
import { ApiCommonResponse } from '@libs/decorators';

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

  /**
   * 관리자 목록 조회 API
   */
  @Get('members')
  @ApiCommonResponse(AdminResponseDto)
  async list(@Query() query: AdminQueryDto) {
    // 1. Destructure body, params, query
    const { search, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminService.list({ search, searchValue }, options);

    // 4. Send response
    return { data };
  }
}
