import { Controller, UseGuards, Get, Query, Post, Body, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@common/guards';
import { AdminTagService } from '../applications/admin-tag.service';
import { AdminTagQueryDto, TagCreateDto, TagUpdateDto } from './dto';

@ApiTags('[관리자] 태그 API')
@Controller('admins/tags')
@UseGuards(AdminGuard)
export class AdminTagController {
  constructor(private readonly adminTagService: AdminTagService) {}

  /**
   * 태그 목록 조회
   */
  @Get()
  async list(@Query() query: AdminTagQueryDto) {
    // 1. Destructure body, params, query
    const { search, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminTagService.list({ search, searchValue }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 태그 생성
   */
  @Post()
  async create(@Body() body: TagCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminTagService.create({ ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 태그 수정
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: TagUpdateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminTagService.update({ id, ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 태그 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminTagService.remove({ id });

    // 4. Send response
    return { data: {} };
  }
}
