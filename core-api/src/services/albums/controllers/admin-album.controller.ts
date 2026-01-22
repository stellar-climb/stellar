import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAlbumService } from '../applications/admin-album.service';
import { AdminGuard } from '@common/guards';
import { AdminAlbumQueryDto, AlbumCreateDto, AlbumUpdateDto } from './dto';

@ApiTags('[관리자] 앨범 API')
@Controller('admins/albums')
@UseGuards(AdminGuard)
export class AdminAlbumController {
  constructor(private readonly adminAlbumService: AdminAlbumService) {}

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
    const { isOpen, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminAlbumService.list({ isOpen }, options);

    // 4. Send response
    return { data };
  }

  /**
   * 앨범 상세 조회
   */
  @Get(':id')
  async retreive(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminAlbumService.retreive({ id });

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
    // 3. Get result
    await this.adminAlbumService.update({ id, ...body });
    // 4. Send response
    return {};
  }

  /**
   * 앨범 삭제
   */
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminAlbumService.remove({ id });

    // 4. Send response
    return { data: {} };
  }
}
