import { IsOptional, IsString } from 'class-validator';

export class RolePolicyUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
