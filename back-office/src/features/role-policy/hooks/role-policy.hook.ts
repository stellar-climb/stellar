import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rolePolicyRepository } from '../api';
import type { RolePolicyListFilter, RolePolicyCreate, RolePolicyUpdate } from '../models';

// 1. Init query keys
const rolePolicyKeys = {
  all: ['RolePolicy'],
  lists: () => [...rolePolicyKeys.all, 'list'],
  list: (filter: RolePolicyListFilter) => [...rolePolicyKeys.lists(), filter],
  retrieves: () => [...rolePolicyKeys.all, 'retrieve'],
  retrieve: (id: number) => [...rolePolicyKeys.retrieves(), id],
};

// 2. useQuery
export const useRolePolicyList = (filter: RolePolicyListFilter) => {
  const { data: rolePolicies, isLoading } = useQuery({
    queryKey: rolePolicyKeys.list(filter),
    queryFn: () => rolePolicyRepository.list(filter),
  });

  return { rolePolicies, isLoading };
};

// 3. useMutation
export const useCreateRolePolicy = () => {
  const queryClient = useQueryClient();

  const { mutate: createRolePolicy, isPending: isLoading } = useMutation({
    mutationFn: (params: RolePolicyCreate) => rolePolicyRepository.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolePolicyKeys.all });
    },
  });

  return { createRolePolicy, isLoading };
};

export const useUpdateRolePolicy = () => {
  const queryClient = useQueryClient();

  const { mutate: updateRolePolicy, isPending: isLoading } = useMutation({
    mutationFn: (params: RolePolicyUpdate) => rolePolicyRepository.update(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolePolicyKeys.all });
    },
  });

  return { updateRolePolicy, isLoading };
};

export const useRemoveRolePolicy = () => {
  const queryClient = useQueryClient();

  const { mutate: removeRolePolicy, isPending: isLoading } = useMutation({
    mutationFn: ({ id }: { id: number }) => rolePolicyRepository.remove({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolePolicyKeys.all });
    },
  });

  return { removeRolePolicy, isLoading };
};

// 4. Custom hooks
