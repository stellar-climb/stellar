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
};

queryKeyMap.set(musicRepository.getMusicsByAlbumId, ['Music']);
