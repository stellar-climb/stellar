import { IsOptional, IsString } from 'class-validator';

export class AlbumUpdateDto {
  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  bannerImageUrl?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subTitle?: string;

  @IsString()
  @IsOptional()
  publisher?: string;
}
