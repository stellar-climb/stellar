import { DddEvent } from '@libs/ddd';
import { type Admin } from '@services/admins/domain/admin.entity';

export class AlbumUpdatedEvent extends DddEvent {
  public albumId: number;

  public before: Record<string, any>;

  public after: Record<string, any>;

  public admin?: Admin;

  constructor(albumId: number, before: Record<string, any>, after: Record<string, any>, admin?: Admin) {
    super();

    this.albumId = albumId;
    this.before = this.toPlain(before);
    this.after = this.toPlain(after);
    this.admin = admin;
  }
}
