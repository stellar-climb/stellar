import { DddService } from '@libs/ddd';
import { addDays, today } from '@libs/utils';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AlbumRepository } from '@services/albums/repository/album.repository';
import { MusicRepository } from '@services/music/repository/music.repository';
import { MusicStatus } from '@services/music/domain/music.entity';
import { type Admin } from '@services/admins/domain/admin.entity';

@Injectable()
export class AlbumPublishService extends DddService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly musicRepository: MusicRepository
  ) {
    super();
  }

  async changeOpen({ albumId, isOpen, admin }: { albumId: number; isOpen: boolean; admin: Admin }) {
    const [[album], musics] = await Promise.all([
      this.albumRepository.find({ id: albumId }),
      this.musicRepository.find({
        albumId,
        maxExpectedPublishOn: addDays(today('YYYY-MM-DD'), 1, 'day'),
      }),
    ]);

    if (!album) {
      throw new BadRequestException('등록되지 않은 앨범입니다.', { cause: '등록되지 않은 앨범입니다.' });
    }

    if (!musics.length) {
      throw new BadRequestException('공개할 수 있는 음악이 없습니다.', { cause: '공개할 수 있는 음악이 없습니다.' });
    }

    album.changeOpen(isOpen, admin);
    musics.forEach((music) => music.update({ status: isOpen ? MusicStatus.PUBLISH : MusicStatus.INACTIVE }));

    await Promise.all([this.albumRepository.save([album]), this.musicRepository.save(musics)]);
  }
}
