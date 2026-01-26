import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminMusicService } from '../applications/admin-music.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '@common/guards';
import { MusicCreateDto } from './dto';

@ApiTags('[관리자] 음악 API')
@Controller('admins')
@UseGuards(AdminGuard)
export class AdminMusicController {
  constructor(private readonly adminMusicService: AdminMusicService) {}

  @Post('albums/:albumId/musics')
  async create(@Param('albumId', ParseIntPipe) albumId: number, @Body() body: MusicCreateDto) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    await this.adminMusicService.create({ albumId, ...body });

    // 4. Send response
    return { data: {} };
  }

  @Get('albums/:albumId/musics')
  async getMusicsByAlbumId(@Param('albumId', ParseIntPipe) albumId: number) {
    // 1. Destructure body, params, query
    // 2. Get context
    // 3. Get result
    const data = await this.adminMusicService.list({ albumId });

    // 4. Send response
    return { data };
  }
}
