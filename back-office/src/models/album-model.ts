export interface AlbumModel {
  coverImageUrl: string;

  bannerImageUrl: string | null;

  title: string;

  subTitle: string;

  publisher: string;

  isOpen: boolean;

  publishedOn: string | null;
}
