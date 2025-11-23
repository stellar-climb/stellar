import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  /**
   * @example 1
   */
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  /**
   * @example 10
   */
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number = 10;
}
