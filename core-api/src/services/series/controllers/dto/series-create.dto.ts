import { SeriesMakingType } from '@services/series/domain/series.entity';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SeriesCreateDto {
  @IsString()
  @IsNotEmpty()
  coverImageUrl: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  writer: string;

  @IsString()
  @IsNotEmpty()
  illustrator: string;
  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdultContent: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(SeriesMakingType)
  @IsNotEmpty()
  makingType: SeriesMakingType;
}
