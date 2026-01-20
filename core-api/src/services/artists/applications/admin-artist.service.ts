import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { ArtistRepository } from '../repository/artist.repository';
import { PaginationOptions } from '@libs/utils';
import { ArtistStatus } from '../domain/artist.entity';

@Injectable()
export class AdminArtistService extends DddService {
  constructor(private readonly artistRepository: ArtistRepository) {
    super();
  }

  async list(
    { status, search, searchValue }: { status: ArtistStatus; search?: string; searchValue?: string },
    options: PaginationOptions
  ) {
    const [artists, total] = await Promise.all([
      this.artistRepository.find({ status, search, searchValue }, { options }),
      this.artistRepository.count({ status, search, searchValue }),
    ]);

    return { items: artists, total };
  }
}
