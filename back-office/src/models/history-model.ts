export interface HistoryModel {
  id: number;

  entity: string;

  entityId: string;

  adminId: string;

  adminName: string;

  log: Record<string, any>;

  createdAt: Date;
}
