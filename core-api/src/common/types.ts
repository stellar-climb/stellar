import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description 달력 날짜 타입
 * @example YYYY-MM-DD
 * @example YYYY-MM-DD HH:mm:ss
 */
export type CalendarDate = string;

export class PaginationDto {
  @ApiProperty({ description: '페이지 번호', example: 1, default: 1, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ description: '페이지 당 아이템 수', example: 10, default: 10, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ description: '정렬 필드', required: false })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({ description: '정렬 순서(ASC, DESC)', example: 'DESC', required: false })
  @IsString()
  @IsOptional()
  order?: 'ASC' | 'DESC';
}
