export enum HeroType {
  HOME = 'home',
  ALBUM = 'album',
  SERIES = 'series',
}

export interface HeroModel {
  id: number;

  type: HeroType;
}

export interface HeroListFilter {
  page: number;
  limit: number;
  filter: {
    type?: HeroType;
  };
}
