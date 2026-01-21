import { IsNotEmpty, IsString } from 'class-validator';

export class TagCreateDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
