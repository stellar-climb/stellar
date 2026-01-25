import { QueryClient, useQuery as useReactQuery, useMutation as useReactMutation } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});
export const queryKeyMap = new Map();

export const useQuery = <T extends Record<string, any>, R>(
  queryFn: (...args: T[]) => Promise<R>,
  options?: {
    variables?: T;
    enabled?: boolean;
  }
) => {
  const { isLoading: loading, ...result } = useReactQuery({
    queryKey: [...queryKeyMap.get(queryFn), ...Object.values(options?.variables || {})],
    queryFn: () => (options?.variables ? queryFn(options?.variables) : queryFn({} as T)),
    enabled: options?.enabled,
  });

  return { loading, ...result };
};

export const useMutation = <T extends Record<string, any>, R>(
  mutationFn: (args: T) => Promise<R>,
  options?: {
    onSuccess?: (data: R) => void;
    onError?: (err: Error) => void;
  }
): [(options: { variables: T }) => Promise<R>, { loading: boolean }] => {
  const { mutateAsync, isPending: loading } = useReactMutation({
    mutationKey: [...queryKeyMap.get(mutationFn)],
    mutationFn: mutationFn,
    onSuccess: (result) => {
      if (queryKeyMap.get(mutationFn)) {
        queryClient.refetchQueries({
          queryKey: [...queryKeyMap.get(mutationFn)],
          exact: false,
        });
      }
      options?.onSuccess?.(result);
    },
    onError: options?.onError,
  });

  return [
    (options: { variables: T }) => {
      return mutateAsync(options.variables, {});
    },
    { loading },
  ];
};
