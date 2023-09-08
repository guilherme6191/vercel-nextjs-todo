
import { updateTodo } from '@/lib/db.client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../xata.codegen.server';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries(['todos', updatedTodo.id]);

      const previousTodos = queryClient.getQueryData<Todos[]>(['todos']);
      // optimistic update
      queryClient.setQueryData(['todos'], (list: Partial<Todos>[] | undefined) => {
        return (list || []).map((item) => (item.id === updatedTodo.id ? updatedTodo : item));
      });

      return { previousTodos, updatedTodo };
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },

    onError: (err, _updatedTodo, context) => {
      console.log(err);
      // return previous data on error
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
  });
};
