import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Context, ContextKey } from '../context';
import { type Request } from 'express';
import { UserRepository } from '@services/users/repository/user.repository';
import { JwtHelperService } from '@common/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly context: Context,
    private readonly userRepository: UserRepository,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('there is no token.', { cause: 'No Authorization Token' });
    }

    try {
      const { id } = await this.jwtHelperService.verifyAccessToken<{ id: number }>(token);
      const [user] = await this.userRepository.find({ id });

      if (!user) {
        throw new UnauthorizedException('user not found.', { cause: 'User Not Found' });
      }

      this.context.set(ContextKey.USER, user);
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
