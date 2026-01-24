import type { CalendarDate } from '@libs';

export enum ArtistStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ArtistType {
  VOICE_ARTIST = 'voice_artist',
  ACTOR = 'actor',
  CREATOR = 'creator',
}

export interface ArtistModel {
  id: number;
  name: string;
  nickname: string;
  status: ArtistStatus;
  type: ArtistType;
  expectedActivatedOn: CalendarDate;
  phoneNumber: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
}
