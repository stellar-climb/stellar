import type { AlbumModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const albumRepository = {
  async list({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: { search?: string; searchValue?: string; isOpen?: boolean };
  }) {
    return httpClient.get<{ items: AlbumModel[]; total: number }>('/albums', {
      params: {
        page,
        limit,
        ...filter,
      },
    });
  },

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
    return httpClient.post<Promise<void>>('/albums', { title, subTitle, publisher, coverImageUrl, bannerImageUrl });
  },

  async retrieve({ albumId }: { albumId: number }) {
    return httpClient.get<Promise<AlbumModel>>(`/albums/${albumId}`);
  },

  async update({
    albumId,
    title,
    subTitle,
    publisher,
  }: {
    albumId: number;
    title?: string;
    subTitle?: string;
    publisher?: string;
  }) {
    return httpClient.put<Promise<void>>(`/albums/${albumId}`, { title, subTitle, publisher });
  },

  async changeOpen({ albumId, isOpen }: { albumId: number; isOpen: boolean }) {
    return httpClient.put<Promise<void>>(`/albums/${albumId}/open`, { isOpen });
  },
};

queryKeyMap.set(albumRepository.list, ['Album']);
queryKeyMap.set(albumRepository.create, ['Album']);
queryKeyMap.set(albumRepository.retrieve, ['Album']);
queryKeyMap.set(albumRepository.update, ['Album']);
queryKeyMap.set(albumRepository.changeOpen, ['Album']);
