import { FindOptionsRelations } from 'typeorm';
import { LessThan, MoreThanOrEqual, And, ILike, In } from 'typeorm';

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

/**
 * 범위 값 체크
 * @param minValue 최소값
 * @param maxValue 최대값
 * @returns 범위 값
 */
export function checkRangeValue(minValue?: any, maxValue?: any) {
  if (!minValue && maxValue) {
    return LessThan(maxValue);
  }

  if (minValue && !maxValue) {
    return MoreThanOrEqual(minValue);
  }

  if (minValue && maxValue) {
    return And(MoreThanOrEqual(minValue), LessThan(maxValue));
  }

  return undefined;
}

/**
 * 문자열 포함 여부 체크
 * @param searchKey 검색 키워드
 * @param searchValue 검색 값
 * @returns 검색 키워드와 검색 값
 */
export function checkLikeValue({ search, searchValue }: { search?: string; searchValue?: string }) {
  if (search && searchValue) {
    return { [search]: ILike(`%${searchValue}%`) };
  }

  return undefined;
}

export function checkInValue(values?: any[]) {
  return values && In(values);
}
