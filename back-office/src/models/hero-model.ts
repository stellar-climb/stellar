export enum HeroType {
  HOME = 'home',
  ALBUM = 'album',
  SERIES = 'series',
}

export interface HeroModel {
  id: number;

  type: HeroType;
}
