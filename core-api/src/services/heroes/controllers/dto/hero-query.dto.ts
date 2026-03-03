import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../../common/dto';
import { HeroType } from '../../domain/hero.entity';

export class AdminHeroQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(HeroType)
  type: HeroType;
}
