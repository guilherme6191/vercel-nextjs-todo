'use client'

import { useQuery } from '@tanstack/react-query'
import { TodoAdd } from '~/components/todo-add'
import { TodoList } from '~/components/todo-list'
import { getTodos } from '~/lib/db.client'
import { TodoProps } from '~/lib/db.server'

type Props = {
  userEmail: string
  initialTodos: TodoProps[]
}

export default function Todos({ initialTodos, userEmail }: Props) {
  const { data: todoList } = useQuery(
    ['todos'],
    () => {
      return getTodos(userEmail)
    },
    {
      initialData: initialTodos,
    }
  )

  return (
    <div className="w-full">
      <TodoAdd userEmail={userEmail} />
      <TodoList list={todoList} />
    </div>
  )
}
