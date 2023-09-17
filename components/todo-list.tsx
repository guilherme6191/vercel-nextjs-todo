import { useDeleteTodo } from '@/lib/hooks/delete-todo';
import { useUpdateTodo } from '@/lib/hooks/update-todo';
import { SuccessToast } from './success-toast';
import { useEffect, useState } from 'react';
import { Todos } from '@/lib/xata.codegen.server';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { SearchIcon, Trash2Icon } from 'lucide-react';
import { Input } from './ui/input';

export function TodoList({ list }: { list: Todos[] }) {
  const {
    mutate: mutateTodo,
    isSuccess: isUpdateSuccess,
    reset: updateSuccess,
    isLoading: isLoadingUpdate,
  } = useUpdateTodo();
  const {
    mutate: mutateDeleteTodo,
    isSuccess: isDeleteSuccess,
    reset: deleteReset,
    isLoading: isLoadingDelete,
  } = useDeleteTodo();
  const [filterTerm, setFilterTerm] = useState('');
  const filteredList = list.filter((item) => item.message?.toLowerCase().includes(filterTerm?.toLowerCase()));

  useEffect(() => {
    let clearMutation: NodeJS.Timeout | undefined = undefined;

    if (isDeleteSuccess) {
      clearMutation = setTimeout(() => {
        deleteReset();
      }, 1000);
    }

    if (isUpdateSuccess) {
      clearMutation = setTimeout(() => {
        updateSuccess();
      }, 1000);
    }

    return () => {
      clearTimeout(clearMutation);
    };
  }, [isDeleteSuccess, isUpdateSuccess, deleteReset, updateSuccess]);

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
              defaultChecked={!!item.is_done}
              disabled={isLoadingUpdate || isLoadingDelete}
              onCheckedChange={(isChecked) => {
                mutateTodo({
                  id: item.id,
                  message: item.message!,
                  checked: Boolean(isChecked),
                });
              }}
            />
            <label htmlFor={item.id} className={`${item.is_done ? 'line-through' : ''}`}>
              {item.message}
            </label>
          </div>

          <Button
            onClick={() => {
              mutateDeleteTodo(item.id);
            }}
            variant="outline"
            className="color-red flex-shrink-0"
            size="icon"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </li>
      ))}
      {isDeleteSuccess || isUpdateSuccess ? <SuccessToast /> : null}
      <SuccessToast />
    </ul>
  );
}
