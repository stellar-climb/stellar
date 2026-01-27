import { Module } from '@nestjs/common';
import { MusicRepository } from './repository/music.repository';
import { AdminMusicController } from './controllers/admin-music.controller';
import { AdminMusicService } from './applications/admin-music.service';
import { TagRepository } from '@services/tags/repository/tag.repository';

@Module({
  controllers: [AdminMusicController],
  providers: [MusicRepository, AdminMusicService, TagRepository],
  exports: [MusicRepository, AdminMusicService],
})
export class AdminMusicModule {}
