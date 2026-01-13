import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminRolePolicyService } from '../applications/admin-role-policy.service';
import { RolePolicyCreateDto, RolePolicyQueryDto, RolePolicyUpdateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { Context, ContextKey } from '@common/context';
import { Admin } from '@services/admins/domain/admin.entity';

@ApiTags('[관리자] 역할 정책')
@Controller('admins/policies/roles')
@UseGuards(AdminGuard)
export class AdminRolePolicyController {
  constructor(
    private readonly adminRolePolicyService: AdminRolePolicyService,
    private readonly context: Context
  ) {}

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
    const admin = this.context.get<Admin>(ContextKey.ADMIN);

    // 3. Get result
    await this.adminRolePolicyService.update({ id, ...body, admin });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 역할 정책 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminRolePolicyService.remove({ id });

    // 4. Send response
    return { data: {} };
  }
}
