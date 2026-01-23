import { Module } from '@nestjs/common';
import { MusicRepository } from './repository/music.repository';
import { AdminMusicController } from './controllers/admin-music.controller';
import { AdminMusicService } from './applications/admin-music.service';

@Module({
  controllers: [AdminMusicController],
  providers: [MusicRepository, AdminMusicService],
  exports: [MusicRepository, AdminMusicService],
})
export class AdminMusicModule {}
