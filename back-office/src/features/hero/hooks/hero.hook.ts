import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { HeroListFilter, HeroType } from '../models';
import { heroRepository } from '../api';

const heroKeys = {
  all: ['Hero'] as const,
  lists: () => [...heroKeys.all, 'list'] as const,
  list: (filter: HeroListFilter) => [...heroKeys.lists(), filter] as const,
  retrieves: () => [...heroKeys.all, 'retrieve'] as const,
  retrieve: (id: number) => [...heroKeys.retrieves(), id] as const,
};

export const useHeroList = (filter: HeroListFilter) => {
  const { data: heroes, isLoading } = useQuery({
    queryKey: heroKeys.list(filter),
    queryFn: () => heroRepository.list(filter),
  });

  return { heroes, isLoading };
};

export const useHeroRetrieve = (id: number) => {
  const { data: hero, isLoading } = useQuery({
    queryKey: heroKeys.retrieve(id),
    queryFn: () => heroRepository.retrieve({ id }),
  });

  return { hero, isLoading };
};

export const useCreateHero = () => {
  const queryClient = useQueryClient();
  const { mutate: createHero, isPending: isLoading } = useMutation({
    mutationFn: ({ type }: { type: HeroType }) => heroRepository.create({ type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heroKeys.all });
    },
  });

  return { createHero, isLoading };
};
