import { IsBoolean } from 'class-validator';

export class AlbumChangeOpenDto {
  @IsBoolean()
  isOpen: boolean;
}
