import { IsEnum, IsNotEmpty } from 'class-validator';
import { HeroType } from '../../domain/hero.entity';

export class AdminHeroCreateDto {
  @IsEnum(HeroType)
  @IsNotEmpty()
  type: HeroType;
}
