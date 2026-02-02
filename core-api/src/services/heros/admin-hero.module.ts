import { Module } from '@nestjs/common';
import { HeroRepository } from './repository/hero.repository';
import { AdminHeroController } from './controllers/admin-hero.controller';
import { AdminHeroService } from './applications/admin-hero.service';

@Module({
  controllers: [AdminHeroController],
  providers: [HeroRepository, AdminHeroService],
  exports: [HeroRepository, AdminHeroService],
})
export class AdminHeroModule {}
