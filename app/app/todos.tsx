'use client';

import { useQuery } from '@tanstack/react-query';
import { TodoList } from '@/components/todo-list';
import { getTodos } from '@/lib/db.client';

import { TodoAdd } from '@/components/todo-add';
import { Todos } from '@/lib/xata.codegen.server';
import { Card } from '@/components/ui/card';

type Props = {
  userEmail: string;
  initialTodos: Readonly<Todos>[];
};

export default function Todos({ initialTodos, userEmail }: Props) {
  const { data: todoList } = useQuery(
    ['todos'],
    () => {
      return getTodos(userEmail);
    },
    {
      initialData: initialTodos,
    }
  );

  return (
    <main className="flex items-center justify-center">
      <Card className="p-8 mt-2 sm:w-full md:w-1/2">
        <TodoAdd userEmail={userEmail} />
        <TodoList list={todoList} />
      </Card>
    </main>
  );
}
