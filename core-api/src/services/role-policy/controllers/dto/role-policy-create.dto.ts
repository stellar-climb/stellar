import { IsNotEmpty, IsString } from 'class-validator';

export class RolePolicyCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
