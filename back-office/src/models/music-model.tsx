import type { CalendarDate } from '../libs';
import { Chip } from '@mui/material';

export enum MusicStatus {
  PREPARE = 'PREPARE',
  PUBLISH = 'PUBLISH',
  INACTIVE = 'INACTIVE',
}

export interface MusicModel {
  id: number;
  thumbnailImageUrl: string;
  albumId: number;
  title: string;
  lyricist: string;
  songwriter: string;
  lyrics?: string;
  status: MusicStatus;
  expectedPublishOn: CalendarDate | null;
  isAdultContent: boolean;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getMusicStatusLabel(status: MusicStatus) {
  switch (status) {
    case MusicStatus.PREPARE:
      return <Chip label="준비" color="warning" />;
    case MusicStatus.PUBLISH:
      return <Chip label="공개" color="success" />;
    case MusicStatus.INACTIVE:
      return <Chip label="비활성" color="error" />;
  }
}
