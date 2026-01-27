import { FaqType } from '../../domain/faq.entity';
import { IsEnum, IsString } from 'class-validator';

export class FaqCreateDto {
  @IsEnum(FaqType)
  @IsString()
  type: FaqType;

  @IsString()
  question: string;

  @IsString()
  answer: string;
}
