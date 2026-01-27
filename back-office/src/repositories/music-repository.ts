import type { MusicModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const musicRepository = {
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
  }: {
    albumId: number;
    thumbnailImageUrl: string;
    title: string;
    expectedPublishOn: string;
    lyricist: string;
    songwriter: string;
    lyrics?: string;
    isAdultContent: boolean;
    isMain: boolean;
  }) {
    return httpClient.post<MusicModel>(`/albums/${albumId}/musics`, {
      thumbnailImageUrl,
      title,
      expectedPublishOn,
      lyricist,
      songwriter,
      lyrics,
      isAdultContent,
      isMain,
    });
  },

  async getMusicsByAlbumId({ albumId, page, limit }: { albumId: number; page: number; limit: number }) {
    return httpClient.get<{ items: MusicModel[]; total: number }>(`/albums/${albumId}/musics`, {
      params: {
        page,
        limit,
      },
    });
  },

  async retrieve({ id, albumId }: { id: number; albumId: number }) {
    return httpClient.get<MusicModel>(`/albums/${albumId}/musics/${id}`);
  },

  async update({
    id,
    albumId,
    thumbnailImageUrl,
    title,
    lyricist,
    songwriter,
    lyrics,
    expectedPublishOn,
    isAdultContent,
    isMain,
    tagIds,
  }: {
    id: number;
    albumId: number;
    thumbnailImageUrl?: string;
    title?: string;
    lyricist?: string;
    songwriter?: string;
    lyrics?: string;
    expectedPublishOn?: string;
    isAdultContent?: boolean;
    isMain?: boolean;
    tagIds?: number[];
  }) {
    return httpClient.put<MusicModel>(`/albums/${albumId}/musics/${id}`, {
      thumbnailImageUrl,
      title,
      lyricist,
      songwriter,
      lyrics,
      expectedPublishOn,
      isAdultContent,
      isMain,
      tagIds,
    });
  },

  async remove({ id, albumId }: { id: number; albumId: number }) {
    return httpClient.delete<void>(`/albums/${albumId}/musics/${id}`);
  },
};

queryKeyMap.set(musicRepository.create, ['Music']);
queryKeyMap.set(musicRepository.getMusicsByAlbumId, ['Music']);
queryKeyMap.set(musicRepository.retrieve, ['Music']);
queryKeyMap.set(musicRepository.update, ['Music']);
queryKeyMap.set(musicRepository.remove, ['Music']);
