'use client';

import { useQuery } from '@tanstack/react-query';
import { TodoList } from '@/components/todo-list';
import { getTodos } from '@/lib/db.client';

import { TodoAdd } from '@/components/todo-add';
import { Todos } from '@/lib/xata.codegen.server';

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
    <div className="flex flex-grow items-center justify-center">
      <div className="shadow-lg shadow-cyan-500/50 w-[50%] h-full">
        <TodoAdd userEmail={userEmail} />
        <TodoList list={todoList} />
      </div>
    </div>
  );
}
