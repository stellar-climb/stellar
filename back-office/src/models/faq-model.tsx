import { Chip } from '@mui/material';

export enum FaqType {
  ACCOUNT = 'account',
  CONTENT = 'content',
  PAYMENT = 'payment',
  POINT = 'point',
  OTHER = 'other',
  PARTNER = 'partner',
  APP = 'app',
}

export enum FaqStatus {
  PENDING = 'pending',
  OPENED = 'opened',
  INACTIVE = 'inactive',
}

export interface Faq {
  id: number;
  type: FaqType;
  status: FaqStatus;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export function getFaqTypeLabelList() {
  return [
    { value: FaqType.ACCOUNT, label: '계정' },
    { value: FaqType.CONTENT, label: '콘텐츠' },
    { value: FaqType.PAYMENT, label: '결제/환불' },
    { value: FaqType.POINT, label: '포인트' },
    { value: FaqType.OTHER, label: '오류/기타' },
    { value: FaqType.PARTNER, label: '제휴/파트너' },
    { value: FaqType.APP, label: 'APP' },
  ];
}

export function getFaqStatusLabelList(status: FaqStatus) {
  switch (status) {
    case FaqStatus.PENDING:
      return <Chip label="대기" color="warning" />;
    case FaqStatus.OPENED:
      return <Chip label="게시" color="success" />;
    case FaqStatus.INACTIVE:
      return <Chip label="비활성" color="error" />;
  }
}

export function getFaqTypeLabel(type: FaqType) {
  return getFaqTypeLabelList().find((item) => item.value === type)?.label;
}
