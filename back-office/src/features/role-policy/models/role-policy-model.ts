export interface RolePolicyModel {
  id: number;

  name: string;

  description: string;

  createdAt: Date;
}

export interface RolePolicyListFilter {
  page?: number;
  limit?: number;
  filter?: {
    search?: string;
    searchValue?: string;
  };
}

export interface RolePolicyCreate {
  name: string;
  description: string;
}

export interface RolePolicyUpdate {
  id: number;
  name?: string;
  description?: string;
}
