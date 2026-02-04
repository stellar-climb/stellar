import { SeriesMakingType } from '@services/series/domain/series.entity';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class SeriesUpdateDto {
  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  writer?: string;

  @IsString()
  @IsOptional()
  illustrator?: string;

  @IsString()
  @IsOptional()
  publisher?: string;

  @IsBoolean()
  @IsOptional()
  isAdultContent?: boolean;

  @IsEnum(SeriesMakingType)
  @IsOptional()
  makingType?: SeriesMakingType;
}
