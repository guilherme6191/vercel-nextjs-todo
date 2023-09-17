import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { SuccessToast } from './success-toast';
import { useAddTodo } from '@/lib/hooks/add-todo';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export function TodoAdd({ userEmail }: { userEmail: string }) {
  const addTodo = useAddTodo(userEmail);
  const [newTodoMessage, setNewTodoMessage] = useState('');

  useEffect(() => {
    let clearMutation: NodeJS.Timeout | undefined = undefined;

    if (addTodo.isSuccess) {
      setNewTodoMessage('');

      clearMutation = setTimeout(() => {
        addTodo.reset();
      }, 3000);
    }

    return () => {
      clearTimeout(clearMutation);
    };
  }, [addTodo.isSuccess, addTodo]);

  return (
    <>
      <div className="flex justify-center">
        <form
          className="w-full flex justify-center flex-col"
          method="post"
          onSubmit={(evt) => {
            evt.preventDefault();
            addTodo.mutate({
              id: nanoid(),
              message: newTodoMessage,
              is_done: false,
              created_at: new Date(),
            });
          }}
        >
          <label htmlFor="add-todo" className="w-fit self-center text-xl my-2">
            Add todo
          </label>
          <div className="flex items-center border-b py-2">
            <input
              id="add-todo"
              className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="What needs to be done?"
              autoComplete="off"
              value={newTodoMessage}
              readOnly={addTodo.isLoading}
              onChange={(evt) => {
                setNewTodoMessage(evt.currentTarget.value);
              }}
            />
            <Button type="submit" variant="outline" disabled={addTodo.isLoading || newTodoMessage.length < 1}>
              {addTodo.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {addTodo.isLoading ? 'saving...' : 'save'}
            </Button>
          </div>
          {addTodo.isError && (
            <>
              <small className="text-red-400 my-2">
                Server returned: <span className="font-mono">{addTodo.error?.message || 'Something went wrong!'}</span>
              </small>
              <Button type="submit">Try again?</Button>
            </>
          )}
        </form>
      </div>

      {addTodo.isSuccess && <SuccessToast />}
    </>
  );
}
