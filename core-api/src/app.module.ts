import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { HealthController } from './health.controller';
import { DatabasesModule } from '@databases';
import { CommonModule } from '@common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { RequestLoggerInterceptor } from '@libs/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import admins from './services/admins';
import generals from './services/generals';

@Module({
  imports: [DatabasesModule, ConfigsModule, CommonModule, EventEmitterModule.forRoot(), ...admins, ...generals],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
