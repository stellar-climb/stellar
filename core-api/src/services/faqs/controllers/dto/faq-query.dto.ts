import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../common/dto';

export class AdminFaqQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  searchValue?: string;
}
