import { type HeroSeriesCtor } from '@services/heros/domain/hero-series.entity';
import { HeroType } from '@services/heros/domain/hero.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { type HeroEventCtor } from '@services/heros/domain/hero-event.entity';
import { type HeroLinkCtor } from '@services/heros/domain/hero-link.entity';

export class HeroCreateDto {
  @IsEnum(HeroType)
  @IsNotEmpty()
  type: HeroType;

  @IsString()
  @IsOptional()
  backgroundImageUrl?: string;

  @IsNumber()
  @IsNotEmpty()
  sequence: number;

  @IsString()
  @IsNotEmpty()
  startOn: string;

  @IsString()
  @IsNotEmpty()
  endOn: string;

  @IsString()
  @IsOptional()
  heroLink?: HeroLinkCtor;

  @IsString()
  @IsOptional()
  heroEvent?: HeroEventCtor;

  @IsString()
  @IsOptional()
  heroSeries?: HeroSeriesCtor;
}
