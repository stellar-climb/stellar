import { PaginationDto } from '@common/dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SeriesMakingType } from '../../domain/series.entity';

export class SeriesQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsEnum(SeriesMakingType)
  @IsOptional()
  makingType?: SeriesMakingType;
}
