import { IsString, IsOptional } from 'class-validator';

export class TagUpdateDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
