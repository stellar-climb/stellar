import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
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
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
    return { data: {} };
  }

  /**
   * 사용자 상세 조회
   */
  @Get(':id')
  async retrieve(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
    return { data: {} };
  }
}
