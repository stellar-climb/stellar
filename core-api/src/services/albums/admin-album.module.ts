import { Module } from '@nestjs/common';
import { AlbumRepository } from './repository/album.repository';
import { AdminAlbumController } from './controllers/admin-album.controller';
import { AdminAlbumService } from './applications/admin-album.service';
import { AdminMusicModule } from '@services/music/admin-music.module';

@Module({
  imports: [AdminMusicModule],
  controllers: [AdminAlbumController],
  providers: [AlbumRepository, AdminAlbumService],
  exports: [AlbumRepository],
})
export class AdminAlbumModule {}
