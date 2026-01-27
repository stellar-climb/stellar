import { Injectable, BadRequestException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { MusicRepository } from '../repository/music.repository';
import { type PaginationOptions } from '@libs/utils';
import { Transactional } from '@libs/decorators';
import { Music } from '../domain/music.entity';
import { TagRepository } from '@services/tags/repository/tag.repository';

@Injectable()
export class AdminMusicService extends DddService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly tagRepository: TagRepository
  ) {
    super();
  }

  @Transactional()
  async create({
    albumId,
    thumbnailImageUrl,
    title,
    expectedPublishOn,
    lyricist,
    songwriter,
    lyrics,
    isAdultContent,
    isMain,
    tagIds,
  }: {
    albumId: number;
    thumbnailImageUrl: string;
    title: string;
    expectedPublishOn?: string;
    lyricist: string;
    songwriter: string;
    lyrics?: string;
    isAdultContent: boolean;
    isMain: boolean;
    tagIds: number[];
  }) {
    const [duplicatedMusic] = await this.musicRepository.find({ albumId, title });

    if (duplicatedMusic) {
      throw new BadRequestException('이미 앨범에 등록된 음악명입니다.', { cause: '이미 앨범에 등록된 음악명입니다.' });
    }

    const tags = await this.tagRepository.find({ ids: tagIds });

    const music = new Music({
      albumId,
      thumbnailImageUrl,
      title,
      lyricist,
      songwriter,
      lyrics,
      expectedPublishOn,
      isAdultContent,
      isMain,
      tags,
    });

    await this.musicRepository.save([music]);
  }

  async list({ albumId }: { albumId?: number }, options?: PaginationOptions) {
    const [musics, total] = await Promise.all([
      this.musicRepository.find({ albumId }, { options }),
      this.musicRepository.count({ albumId }),
    ]);

    return { items: musics, total };
  }

  async retrieve({ albumId, id }: { albumId: number; id: number }) {
    const [music] = await this.musicRepository.find({ albumId, id });

    if (!music) {
      throw new BadRequestException('음악을 찾을 수 없습니다.', { cause: '음악을 찾을 수 없습니다.' });
    }

    return music;
  }

  @Transactional()
  async update({
    albumId,
    id,
    thumbnailImageUrl,
    title,
    expectedPublishOn,
    lyricist,
    songwriter,
    lyrics,
    isAdultContent,
    isMain,
  }: {
    albumId: number;
    id: number;
    thumbnailImageUrl?: string;
    title?: string;
    expectedPublishOn?: string;
    lyricist?: string;
    songwriter?: string;
    lyrics?: string;
    isAdultContent?: boolean;
    isMain?: boolean;
  }) {
    const [music] = await this.musicRepository.find({ albumId, id });

    if (!music) {
      throw new BadRequestException('음악을 찾을 수 없습니다.', { cause: '음악을 찾을 수 없습니다.' });
    }

    music.update({
      thumbnailImageUrl,
      title,
      lyricist,
      songwriter,
      lyrics,
      expectedPublishOn,
      isAdultContent,
      isMain,
    });

    await this.musicRepository.save([music]);
  }

  @Transactional()
  async remove({ albumId, id }: { albumId: number; id: number }) {
    const [music] = await this.musicRepository.find({ albumId, id });

    if (!music) {
      throw new BadRequestException('음악을 찾을 수 없습니다.', { cause: '음악을 찾을 수 없습니다.' });
    }

    await this.musicRepository.softRemove([music]);
  }
}
