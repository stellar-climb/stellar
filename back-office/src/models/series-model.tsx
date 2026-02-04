import type { CalendarDate } from '@libs';
import { Chip } from '@mui/material';

export enum SeriesStatus {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
}

export enum SeriesMakingType {
  GENERAL = 'general', // 일반
  MONOPOLY = 'monopoly', // 독점
}

export interface SeriesModel {
  id: number;
  coverImageUrl: string;
  name: string;
  writer: string;
  illustrator: string;
  publisher: string;
  isAdultContent: boolean;
  status: SeriesStatus;
  isOpen: boolean;
  publishOn: CalendarDate | null;
  completedOn: CalendarDate | null;
  description: string;
  makingType: SeriesMakingType;
  createdAt: Date;
  updatedAt: Date;
}

export function getSeriesStatus(status: SeriesStatus) {
  switch (status) {
    case SeriesStatus.PENDING:
      return <Chip label="대기" color="info" />;
    case SeriesStatus.ONGOING:
      return <Chip label="진행중" color="primary" />;
    case SeriesStatus.COMPLETED:
      return <Chip label="완결" color="success" />;
    case SeriesStatus.SUSPENDED:
      return <Chip label="중단" color="error" />;
    default:
      return '';
  }
}

export function getSeriesMakingTypeLabel(makingType: SeriesMakingType) {
  switch (makingType) {
    case SeriesMakingType.GENERAL:
      return '일반';
    case SeriesMakingType.MONOPOLY:
      return '독점';
    default:
      return '';
  }
}
