
import { deleteTodo } from '@/lib/db.client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../xata.codegen.server';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onMutate: async (todoId) => {
      await queryClient.cancelQueries(['todos', todoId]);

      const previousTodos = queryClient.getQueryData<Todos[]>(['todos']);
      // optimistic update
      queryClient.setQueryData(['todos'], (list: Todos[] | undefined) => {
        return (list || []).filter((item) => item.id !== todoId);
      });

      return { previousTodos, todoId };
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
