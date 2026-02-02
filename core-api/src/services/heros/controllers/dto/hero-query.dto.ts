import { PaginationDto } from '@common/dto';
import { HeroStatus, HeroType } from '@services/heros/domain/hero.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class HeroQueryDto extends PaginationDto {
  @IsEnum(HeroType)
  @IsOptional()
  type?: HeroType;

  @IsEnum(HeroStatus)
  @IsOptional()
  status?: HeroStatus;
}
