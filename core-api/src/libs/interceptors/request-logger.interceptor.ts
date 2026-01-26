import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { type Observable, tap } from 'rxjs';
import type { Request } from 'express';
import { Context, ContextKey } from '@common/context';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggerInterceptor.name);

  constructor(private readonly context: Context) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `[${request.method}]: ${request.url} (${Date.now() - startTime}ms) - ${this.context.get<string>(ContextKey.TXID)}`
        );
      })
    );
  }
}
