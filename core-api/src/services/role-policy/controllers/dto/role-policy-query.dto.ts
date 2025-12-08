import { PaginationDto } from '@common/dto';
import { IsOptional, IsString } from 'class-validator';

export class RolePolicyQueryDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  searchValue?: string;
}
