import { type CalendarDate } from '@libs';

export enum AdminStatus {
  ACTIVE = 'active',
  EXITED = 'exited',
}

export enum AdminRoleType {
  SUPER = 'super',
  PARTNER = 'partner',
}

const adminStatus = {
  [AdminStatus.ACTIVE]: '활성',
  [AdminStatus.EXITED]: '탈퇴',
};

const adminRoleType = {
  [AdminRoleType.SUPER]: '관리자',
  [AdminRoleType.PARTNER]: '파트너',
};

export interface AdminModel {
  id: string;

  profileImageUrl?: string;

  email: string;

  name: string;

  status: AdminStatus;

  exitOn?: CalendarDate;

  roleType: AdminRoleType;

  createdAt: Date;
}

export function getAdminStatus(status: AdminStatus) {
  return adminStatus[status];
}

export function getAdminRoleType(roleType: AdminRoleType) {
  return adminRoleType[roleType];
}

export interface AdminListFilter {
  page?: number;
  limit?: number;
  filter?: {
    search?: string;
    searchValue?: string;
  };
}
