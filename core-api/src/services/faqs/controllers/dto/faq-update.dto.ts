import { FaqType } from '../../domain/faq.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FaqUpdateDto {
  @IsEnum(FaqType)
  @IsOptional()
  type?: FaqType;

  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  answer?: string;
}
