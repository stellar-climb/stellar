import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';

@Injectable()
export class AdminAuthService extends DddService {
  constructor() {
    super();
  }

  @Transactional()
  async googleSignIn({ accessToken }: { accessToken: string }) {}
}
