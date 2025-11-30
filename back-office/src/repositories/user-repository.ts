import { httpClient } from '@libs';
import type { UserModel } from '@models';

export const userRepository = {
  async self() {
    return httpClient.get<UserModel>('/users/self');
  },
};
