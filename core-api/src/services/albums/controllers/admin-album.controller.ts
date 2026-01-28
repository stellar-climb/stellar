import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAlbumService } from '../applications/admin-album.service';
import { AdminGuard } from '@common/guards';
import { AdminAlbumQueryDto, AlbumCreateDto, AlbumUpdateDto, AlbumChangeOpenDto } from './dto';
import { Context, ContextKey } from '@common/context';
import { Admin } from '@services/admins/domain/admin.entity';

@ApiTags('[관리자] 앨범 API')
@Controller('admins/albums')
@UseGuards(AdminGuard)
export class AdminAlbumController {
  constructor(
    private readonly adminAlbumService: AdminAlbumService,
    private readonly context: Context
  ) {}

  /**
   * 앨범 생성
   */
  @Post()
  async create(@Body() body: AlbumCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminAlbumService.create({ ...body });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 앨범 목록 조회
   */
  @Get()
  async list(@Query() query: AdminAlbumQueryDto) {
    // 1. Destructure body, params, query
    const { isOpen, search, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminAlbumService.list({ isOpen, search, searchValue }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 앨범 상세 조회
   */
  @Get(':id')
  async retrieve(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminAlbumService.retrieve({ id });

    // 4. Send response
    return { data };
  }

  /**
   * 앨범 수정
   */
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: AlbumUpdateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    const admin = this.context.get<Admin>(ContextKey.ADMIN);

    // 3. Get result
    await this.adminAlbumService.update({ id, ...body, admin });

    // 4. Send response
    return {};
  }

  /**
   * 앨범 삭제
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminAlbumService.remove({ id });

    // 4. Send response
    return { data: {} };
  }

  /**
   * 앨범 공개/비공개 변경
   */
  @Put(':id/open')
  async changeOpen(@Param('id', ParseIntPipe) id: number, @Body() body: AlbumChangeOpenDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    const admin = this.context.get<Admin>(ContextKey.ADMIN);

    // 3. Get result
    await this.adminAlbumService.changeOpen({ id, admin, ...body });

    // 4. Send response
    return { data: {} };
  }
}
