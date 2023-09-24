'use client';

import { useContext, useState } from 'react';
import { Todos } from '@/lib/xata.codegen.server';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { Input } from './ui/input';
import { toggleTodo, deleteTodo } from '@/app/actions';
import { TodoFormContext } from './todo-form/root';

type TProps = {
  toggleTodo: typeof toggleTodo;
  deleteTodo: typeof deleteTodo;
};

export function TodoList({ toggleTodo, deleteTodo }: TProps) {
  const { todoList, optSetList, setOptIsSuccess } = useContext(TodoFormContext);
  const [filterTerm, setFilterTerm] = useState('');
  const filteredList = todoList.filter((item: Todos) =>
    item.message?.toLowerCase().includes(filterTerm?.toLowerCase())
  );

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
      {filteredList.map((item: Todos) => (
        <li key={item.id} className="flex justify-between items-center py-1 my-4 border-b-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id={item.id}
              checked={!!item.is_done}
              onCheckedChange={(isChecked) => {
                optSetList({ type: 'toggle', item: { id: item.id, is_done: Boolean(isChecked) } });
                setOptIsSuccess(true);
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
              setOptIsSuccess(true);
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
    </ul>
  );
}
