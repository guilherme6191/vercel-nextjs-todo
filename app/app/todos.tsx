import { TodoList } from '@/components/todo-list';

import { Todos } from '@/lib/xata.codegen.server';
import { Card } from '@/components/ui/card';
import { addTodoAction, deleteTodo, fetchTodos, toggleTodo } from '../actions';
import { TodoForm } from '@/components/todo-form';

type Props = {
  userEmail: string;
};

export default async function Todos({ userEmail }: Props) {
  const _todoList = await fetchTodos(userEmail);
  // get rid of warning with workaround for now: https://github.com/vercel/next.js/issues/47447
  const todoList = JSON.parse(JSON.stringify(_todoList));
  return (
    <main className="flex items-center justify-center">
      <Card className="p-8 mt-2 sm:w-full md:w-1/2">
        <TodoForm.Root onAddTodo={addTodoAction} userEmail={userEmail} todoList={todoList}>
          <TodoForm.Input />
          <TodoForm.Button />
          <TodoList toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </TodoForm.Root>
      </Card>
    </main>
  );
}
