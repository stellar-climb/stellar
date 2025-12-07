import { Exclude, Expose } from 'class-transformer';
import { AdminStatus } from '../../domain/admin.entity';
import { type CalendarDate } from '@common/types';

@Exclude()
export class AdminResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  status: AdminStatus;

  @Expose()
  exitOn?: CalendarDate;

  @Expose()
  createdAt: Date;
}
