import { Module } from '@nestjs/common';
import { AdminHeroService } from './applications/admin-hero.service';
import { HeroRepository } from './repository/hero.repository';
import { AdminHeroController } from './controllers/admin-hero.controller';

@Module({
  controllers: [AdminHeroController],
  providers: [AdminHeroService, HeroRepository],
  exports: [AdminHeroService, HeroRepository],
})
export class AdminHeroModule {}
