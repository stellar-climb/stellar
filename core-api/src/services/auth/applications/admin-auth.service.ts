import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { Transactional } from '@libs/decorators';
import { GoogleService } from '@libs/google';
import { AdminRepository } from '../../admins/repository/admin.repository';
import { Admin } from '../../admins/domain/admin.entity';
import { JwtHelperService } from '@common/jwt';

@Injectable()
export class AdminAuthService extends DddService {
  constructor(
    private readonly googleService: GoogleService,
    private readonly adminRepository: AdminRepository,
    private readonly jwtHelperService: JwtHelperService
  ) {
    super();
  }

  @Transactional()
  async googleSignIn({ code }: { code: string }) {
    const { email, name, picture, sub } = await this.googleService.getAccessToken(code);

    let [admin] = await this.adminRepository.find({ googleSub: sub, email });

    if (!admin) {
      admin = new Admin({ email, name, profileImageUrl: picture, googleSub: sub });

      await this.adminRepository.save([admin]);
    }

    const accessToken = await this.jwtHelperService.signAccessToken({ id: admin.id });
    return { accessToken };
  }
}
