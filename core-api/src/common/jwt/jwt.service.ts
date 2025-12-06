import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigsService } from '@configs';

@Injectable()
export class JwtHelperService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configsService: ConfigsService
  ) {}

  async verifyAccessToken<T extends Record<string, any>>(accessToken: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(accessToken, {
      secret: this.configsService.jwt.accessTokenSecret,
    });
  }

  async signAccessToken({ id }: { id: string }) {
    return this.jwtService.signAsync({ id }, { secret: this.configsService.jwt.accessTokenSecret });
  }
}
