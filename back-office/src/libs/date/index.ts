import dayjs from 'dayjs';

export function today(format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs().format(format);
}

export function format(date: Date | string, format: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}
