import { TodoList } from '@/components/todo-list';
import { TodoAdd } from '@/components/todo-add';
import { Todos } from '@/lib/xata.codegen.server';
import { Card } from '@/components/ui/card';
import { deleteTodo, fetchTodos, toggleTodo } from '../actions';

type Props = {
  userEmail: string;
};

export default async function Todos({ userEmail }: Props) {
  const todoList = await fetchTodos(userEmail);

  return (
    <main className="flex items-center justify-center">
      <Card className="p-8 mt-2 sm:w-full md:w-1/2">
        <TodoAdd userEmail={userEmail} />
        <TodoList list={todoList || []} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </Card>
    </main>
  );
}
