import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;
}
