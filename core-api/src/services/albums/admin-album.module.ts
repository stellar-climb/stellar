import { Module } from '@nestjs/common';
import { AlbumRepository } from './repository/album.repository';
import { AdminAlbumController } from './controllers/admin-album.controller';
import { AdminAlbumService } from './applications/admin-album.service';

@Module({
  controllers: [AdminAlbumController],
  providers: [AlbumRepository, AdminAlbumService],
  exports: [AlbumRepository],
})
export class AdminAlbumModule {}
