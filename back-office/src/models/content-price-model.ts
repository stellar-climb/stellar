export enum PurchaseType {
  INITIAL = 'initial',
  ADDITIONAL = 'additional',
}

export enum ContentPriceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface ContentPriceModel {
  id: number;
  name: string;
  purchaseType: PurchaseType;
  coin: number;
  status: ContentPriceStatus;
}
