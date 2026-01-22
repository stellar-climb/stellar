import { IsOptional, IsString } from 'class-validator';

export class AlbumCreateDto {
  @IsString()
  coverImageUrl: string;

  @IsString()
  @IsOptional()
  bannerImageUrl?: string;

  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  @IsString()
  publisher: string;
}
