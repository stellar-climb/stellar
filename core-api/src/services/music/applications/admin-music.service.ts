import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { MusicRepository } from '../repository/music.repository';
import { type PaginationOptions } from '@libs/utils';

@Injectable()
export class AdminMusicService extends DddService {
  constructor(private readonly musicRepository: MusicRepository) {
    super();
  }

  async list({ albumId }: { albumId?: number }, options?: PaginationOptions) {
    const [musics, total] = await Promise.all([
      this.musicRepository.find({ albumId }, { options }),
      this.musicRepository.count({ albumId }),
    ]);

    return { items: musics, total };
  }
}
