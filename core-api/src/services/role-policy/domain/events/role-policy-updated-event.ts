import { DddEvent } from '@libs/ddd';
import { type Admin } from '@services/admins/domain/admin.entity';

export class RolePolicyUpdatedEvent extends DddEvent {
  public rolePolicyId: number;

  public before: Record<string, any>;

  public after: Record<string, any>;

  public admin?: Admin;

  constructor(rolePolicyId: number, before: Record<string, any>, after: Record<string, any>, admin?: Admin) {
    super();

    this.rolePolicyId = rolePolicyId;
    this.before = before;
    this.after = after;
    this.admin = admin;
  }
}
