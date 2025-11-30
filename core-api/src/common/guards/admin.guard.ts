import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Context, ContextKey } from '../context';
import { type Request } from 'express';
import { AdminRepository } from '@services/admins/repository/admin.repository';
import { JwtHelperService } from '@common/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly context: Context,
    private readonly adminRepository: AdminRepository,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('there is no token.', { cause: 'No Authorization Token' });
    }

    try {
      const { id } = await this.jwtHelperService.verifyAccessToken<{ id: string }>(token);
      const [admin] = await this.adminRepository.find({ id });

      if (!admin) {
        throw new UnauthorizedException('user not found.', { cause: 'User Not Found' });
      }

      this.context.set(ContextKey.ADMIN, admin);
      return true;
    } catch (error) {
      throw new UnauthorizedException('invalid token.', { cause: 'Invalid Authorization Token' });
    }
  }

  private extractToken(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
