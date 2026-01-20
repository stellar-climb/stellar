import { Module } from '@nestjs/common';
import { AdminArtistController } from './controllers/admin-artist.controller';
import { AdminArtistService } from './applications/admin-artist.service';
import { ArtistRepository } from './repository/artist.repository';

@Module({
  controllers: [AdminArtistController],
  providers: [AdminArtistService, ArtistRepository],
  exports: [AdminArtistService],
})
export class AdminArtistModule {}
