import { DddEvent } from '@libs/ddd';

export class AlbumOpenChangedEvent extends DddEvent {
  public albumId: number;

  public isOpen: boolean;

  constructor(albumId: number, isOpen: boolean) {
    super();
    this.albumId = albumId;
    this.isOpen = isOpen;
  }
}
