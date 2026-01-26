import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { type CalendarDate } from '@common/types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export function today(format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD'): CalendarDate {
  return dayjs().tz().format(format);
}

export function addDays(date: CalendarDate | Date, days: number, type: 'day' | 'minute', format = 'YYYY-MM-DD') {
  return dayjs(date).tz().add(days, type).format(format);
}
