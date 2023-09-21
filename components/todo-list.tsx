'use client';

import { SuccessToast } from './success-toast';
import { useEffect, useState } from 'react';
import { Todos, TodosRecord } from '@/lib/xata.codegen.server';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { Input } from './ui/input';
import { SelectedPick } from '@xata.io/client';
import { toggleTodo, deleteTodo } from '@/app/actions';
import { experimental_useOptimistic as useOptimistic } from 'react';

type Todo = Readonly<SelectedPick<TodosRecord, ['*']>>;

type TProps = {
  list: Todo[];
  toggleTodo: typeof toggleTodo;
  deleteTodo: typeof deleteTodo;
};

type TOptimisticAction = {
  type: 'toggle' | 'delete';
  item: Partial<Todo>;
};

export function TodoList({ list, toggleTodo, deleteTodo }: TProps) {
  const [optList, optSetList] = useOptimistic(list, (state: Todo[], { type, item }: TOptimisticAction) => {
    if (type === 'toggle') {
      return state.map((todo) => {
        if (todo.id === item.id) {
          return {
            ...todo,
            is_done: Boolean(item.is_done),
          };
        }
        return todo;
      });
    }
    if (type === 'delete') {
      return state.filter((todo) => todo.id !== item.id);
    }
    return state;
  });

  const [filterTerm, setFilterTerm] = useState('');
  const filteredList = optList.filter((item) => item.message?.toLowerCase().includes(filterTerm?.toLowerCase()));

  return (
    <ul className="pt-14">
      <div className="flex items-center space-x-2 mt-2">
        <Input
          type="text"
          placeholder="Search"
          className="pl-12 pr-4"
          value={filterTerm}
          onChange={(evt) => setFilterTerm(evt.target.value)}
        />
        <SearchIcon className="absolute w-6 h-6 text-gray-400" />
      </div>
      {filteredList.map((item) => (
        <li key={item.id} className="flex justify-between items-center py-1 my-4 border-b-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id={item.id}
              checked={!!item.is_done}
              onCheckedChange={(isChecked) => {
                optSetList({ type: 'toggle', item: { id: item.id, is_done: Boolean(isChecked) } });
                toggleTodo(item.id, Boolean(isChecked));
              }}
            />
            <label htmlFor={item.id} className={`${item.is_done ? 'line-through' : ''}`}>
              {item.message}
            </label>
          </div>

          <Button
            onClick={() => {
              optSetList({ type: 'delete', item: { id: item.id } });
              deleteTodo(item.id);
            }}
            variant="outline"
            className="color-red flex-shrink-0"
            size="icon"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </li>
      ))}
      {/* {isDeleteSuccess || isUpdateSuccess ? <SuccessToast /> : null} */}
    </ul>
  );
}
