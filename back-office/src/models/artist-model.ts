export enum ArtistStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface ArtistModel {
  id: number;
  name: string;
  nickname: string;
  status: ArtistStatus;
  createdAt: Date;
  updatedAt: Date;
}
