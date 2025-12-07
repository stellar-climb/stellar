import { type CalendarDate } from '@libs';

export enum AdminStatus {
  ACTIVE = 'active',
  EXITED = 'exited',
}
const adminStatus = {
  [AdminStatus.ACTIVE]: '활성',
  [AdminStatus.EXITED]: '탈퇴',
};

export interface AdminModel {
  id: string;

  email: string;

  name: string;

  status: AdminStatus;

  exitOn?: CalendarDate;

  profileImageUrl: string;

  createdAt: Date;
}

export function getAdminStatus(status: AdminStatus) {
  return adminStatus[status];
}
