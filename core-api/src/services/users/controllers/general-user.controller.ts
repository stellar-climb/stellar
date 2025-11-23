import { Controller, Get } from '@nestjs/common';

/**
 * [사용자] 사용자 API
 */
@Controller('users')
export class GeneralUserController {
  /**
   * 사용자 목록 조회
   */
  @Get()
  async getUsers() {
    return 'Hello World';
  }
}
