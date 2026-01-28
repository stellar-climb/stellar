import { PaginationDto } from '@common/dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AdminAlbumQueryDto extends PaginationDto {
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  searchValue?: string;
}
