import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addTodo } from '@/lib/db.client';
import type { Todos } from '../xata.codegen.server';

export const useAddTodo = (userEmail: string) => {
  const queryClient = useQueryClient();

  return useMutation((newTodo: Todos) => addTodo(newTodo, userEmail), {
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(['todos']);

      const previousTodos = queryClient.getQueryData<Todos[]>(['todos']);
      // optimistic update
      queryClient.setQueryData(['todos'], (old: any) => [newTodo, ...old]);

      return { previousTodos };
    },
    onError: (err: Error, _newTodo, context) => {
      console.log(err);
      // return previous data on error
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};
