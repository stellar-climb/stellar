import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SeriesChangeOpenDto {
  @IsBoolean()
  @IsNotEmpty()
  isOpen: boolean;
}
