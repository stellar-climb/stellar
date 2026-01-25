import type { MusicModel } from '@models';
import { queryKeyMap, httpClient } from '@libs';

export const musicRepository = {
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
};

queryKeyMap.set(musicRepository.getMusicsByAlbumId, ['Music']);
queryKeyMap.set(musicRepository.retrieve, ['Music']);
