import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserGuard } from '@common/guards';

@ApiTags('[사용자] 사용자 API')
@Controller('users')
@UseGuards(UserGuard)
export class GeneralUserController {
  /**
   * 사용자 목록 조회
   */
  @Get()
  self() {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    // 4. Send response
    return {};
  }
}
