import { PaginationDto } from '@common/dto';
import { IsOptional, IsString } from 'class-validator';
import { ArtistStatus } from '../../domain/artist.entity';

export class AdminArtistQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  status: ArtistStatus;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  searchValue: string;
}
