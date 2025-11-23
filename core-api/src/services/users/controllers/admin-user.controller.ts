import { Controller, Get, Query } from '@nestjs/common';
import { UserQueryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[관리자] 사용자 API')
@Controller('/admins/users')
export class AdminUserController {
  /**
   * 사용자 목록 조회
   */
  @Get()
  async getUsers(@Query() query: UserQueryDto) {
    return 'Hello World';
  }
}
