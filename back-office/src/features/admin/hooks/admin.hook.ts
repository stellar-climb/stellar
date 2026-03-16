import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminRepository } from '../api';
import type { AdminListFilter } from '../models';

// 1. Init query keys
const adminKeys = {
  all: ['Admin'],
  lists: () => [...adminKeys.all, 'list'],
  list: (filter: AdminListFilter) => [...adminKeys.lists(), filter],
  retrieves: () => [...adminKeys.all, 'retrieve'],
  retrieve: (id: number) => [...adminKeys.retrieves(), id],
};

// 2. useQuery
export const useAdminList = (filter: AdminListFilter) => {
  const { data: admins, isLoading } = useQuery({
    queryKey: adminKeys.list(filter),
    queryFn: () => adminRepository.list(filter),
  });

  return { admins, loading: isLoading };
};
