import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AdminRolePolicyService } from '../applications/admin-role-policy.service';
import { RolePolicyCreateDto, RolePolicyQueryDto, RolePolicyUpdateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[관리자] 역할 정책')
@Controller('admins/policies/roles')
export class AdminRolePolicyController {
  constructor(private readonly adminRolePolicyService: AdminRolePolicyService) {}

  /**
   * 역할 정책 생성
   */
  @Post()
  async create(@Body() body: RolePolicyCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminRolePolicyService.create(body);

    // 4. Send response
    return { data: {} };
  }

  /**
   * 역할 정책 목록 조회
   */
  @Get()
  async list(@Query() query: RolePolicyQueryDto) {
    // 1. Destructure body, params, query
    const { search, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminRolePolicyService.list({ search, searchValue }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 역할 정잭 수정
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: RolePolicyUpdateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminRolePolicyService.update({ id, ...body });

    // 4. Send response
    return { data: {} };
  }
}
