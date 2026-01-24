import { DddService } from '@libs/ddd';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AlbumRepository } from '../repository/album.repository';
import { PaginationOptions } from '@libs/utils';
import { Transactional } from '@libs/decorators';
import { Album } from '../domain/album.entity';

@Injectable()
export class AdminAlbumService extends DddService {
  constructor(private readonly albumRepository: AlbumRepository) {
    super();
  }

  @Transactional()
  async create({
    coverImageUrl,
    bannerImageUrl,
    title,
    subTitle,
    publisher,
  }: {
    coverImageUrl: string;
    bannerImageUrl?: string;
    title: string;
    subTitle: string;
    publisher: string;
  }) {
    const [duplicatedAlbum] = await this.albumRepository.find({ title, publisher });

    if (duplicatedAlbum) {
      throw new BadRequestException(`이미 동일한 제목(${title})과 발매사(${publisher})로 등록된 앨범이 존재합니다.`, {
        cause: '이미 동일한 제목과 발매사로 등록된 앨범이 존재합니다.',
      });
    }

    const newAlbum = new Album({ coverImageUrl, bannerImageUrl, title, subTitle, publisher });
    await this.albumRepository.save([newAlbum]);
  }

  async list({ isOpen }: { isOpen?: boolean }, options: PaginationOptions) {
    const [albums, total] = await Promise.all([
      this.albumRepository.find({ isOpen }, { options }),
      this.albumRepository.count({ isOpen }),
    ]);

    return { items: albums, total };
  }

  async retrieve({ id }: { id: number }) {
    const [album] = await this.albumRepository.find({ id });

    if (!album) {
      throw new BadRequestException('등록되지 않은 앨범입니다.', { cause: '등록되지 않은 앨범입니다.' });
    }

    return album;
  }

  @Transactional()
  async update({
    id,
    coverImageUrl,
    bannerImageUrl,
    title,
    subTitle,
    publisher,
  }: {
    id: number;
    coverImageUrl?: string;
    bannerImageUrl?: string;
    title?: string;
    subTitle?: string;
    publisher?: string;
  }) {
    const [album] = await this.albumRepository.find({ id });

    if (!album) {
      throw new BadRequestException('등록되지 않은 앨범입니다.', { cause: '등록되지 않은 앨범입니다.' });
    }

    album.update({ coverImageUrl, bannerImageUrl, title, subTitle, publisher });

    await this.albumRepository.save([album]);
  }

  @Transactional()
  async remove({ id }: { id: number }) {
    const [album] = await this.albumRepository.find({ id });

    if (!album) {
      throw new BadRequestException('등록되지 않은 앨범입니다.', { cause: '등록되지 않은 앨범입니다.' });
    }

    await this.albumRepository.softRemove([album]);
  }

  @Transactional()
  async changeOpen({ id, isOpen }: { id: number; isOpen: boolean }) {
    const [album] = await this.albumRepository.find({ id });

    if (!album) {
      throw new BadRequestException('등록되지 않은 앨범입니다.', { cause: '등록되지 않은 앨범입니다.' });
    }

    album.changeOpen(isOpen);
    await this.albumRepository.save([album]);
  }
}
