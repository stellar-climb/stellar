import { DddEvent } from '@libs/ddd';

export class RolePolicyUpdatedEvent extends DddEvent {
  public rolePolicyId: number;

  public before: Record<string, any>;

  public after: Record<string, any>;

  constructor(rolePolicyId: number, before: Record<string, any>, after: Record<string, any>) {
    super();

    this.rolePolicyId = rolePolicyId;
    this.before = before;
    this.after = after;
  }
}
