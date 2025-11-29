import { FindOptionsRelations } from 'typeorm';

export interface PaginationOptions {
  page?: number;

  limit?: number;

  sort?: string;

  order?: 'ASC' | 'DESC';
}

export interface TypeormRelationOptions<T> extends PaginationOptions {
  relations?: FindOptionsRelations<T>;

  options?: PaginationOptions;
}

export const convertOptions = <T>(options?: TypeormRelationOptions<T>) => {
  let skip;
  let take;
  let order;

  if (options && options.page) {
    skip = ((options.page || 1) - 1) * (options.limit || 1);
  }

  if (options && options.limit) {
    take = options.limit;
  }

  if (options && options.sort && options.order) {
    order = { [options.sort]: options.order };
  }

  return { skip, take, order, relations: options?.relations };
};
