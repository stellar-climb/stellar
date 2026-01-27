import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class MusicCreateDto {
  @IsString()
  thumbnailImageUrl: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  expectedPublishOn?: string;

  @IsString()
  lyricist: string;

  @IsString()
  songwriter: string;

  @IsString()
  @IsOptional()
  lyrics?: string;

  @IsBoolean()
  isAdultContent: boolean;

  @IsBoolean()
  isMain: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
