import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@common/dto';

export class AdminQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsIn(['name', 'email'])
  search?: string;

  @IsOptional()
  @IsString()
  searchValue?: string;
}
