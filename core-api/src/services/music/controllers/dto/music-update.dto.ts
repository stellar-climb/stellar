import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import type { CalendarDate } from '@common/types';

export class MusicUpdateDto {
  @IsString()
  @IsOptional()
  thumbnailImageUrl?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  lyricist?: string;

  @IsString()
  @IsOptional()
  songwriter?: string;

  @IsString()
  @IsOptional()
  lyrics?: string;

  @IsDateString()
  @IsOptional()
  expectedPublishOn?: CalendarDate;

  @IsBoolean()
  @IsOptional()
  isAdultContent?: boolean;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;
}
