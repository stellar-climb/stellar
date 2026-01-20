import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminArtistService } from '../applications/admin-artist.service';
import { AdminGuard } from '@common/guards';
import { AdminArtistQueryDto } from './dto';

@ApiTags('[관리자] 아티스트 API')
@Controller('/admins/artists')
@UseGuards(AdminGuard)
export class AdminArtistController {
  constructor(private readonly adminArtistService: AdminArtistService) {}

  /**
   * 아티스트 목록 조회
   */
  @Get()
  async list(@Query() query: AdminArtistQueryDto) {
    // 1. Destructure body, params, query
    const { status, search, searchValue, ...options } = query;

    // 2. Get context
    // 3. Get result
    const data = await this.adminArtistService.list({ status, search, searchValue }, options);

    // 4. Send response
    return { data };
  }
}
