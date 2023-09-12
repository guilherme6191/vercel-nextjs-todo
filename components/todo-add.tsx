import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { SuccessToast } from './success-toast';
import { useAddTodo } from '@/lib/hooks/add-todo';

export function TodoAdd({ userEmail }: { userEmail: string }) {
  const addTodo = useAddTodo(userEmail);
  const [newTodoMessage, setNewTodoMessage] = useState('');

  useEffect(() => {
    let clearMutation: NodeJS.Timeout | undefined = undefined;

    if (addTodo.isSuccess) {
      setNewTodoMessage('');

      clearMutation = setTimeout(() => {
        addTodo.reset();
      }, 5000);
    }

    return () => {
      clearTimeout(clearMutation);
    };
  }, [addTodo.isSuccess]);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <form
            className="w-full max-w-md flex justify-center flex-col"
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
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                id="add-todo"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="What needs to be done?"
                autoComplete="off"
                value={newTodoMessage}
                readOnly={addTodo.isLoading}
                onChange={(evt) => {
                  setNewTodoMessage(evt.currentTarget.value);
                }}
              />
              <button
                type="submit"
                disabled={addTodo.isLoading || newTodoMessage.length < 1}
                className="flex-shrink-0 cursor-pointer bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                {addTodo.isLoading ? 'saving...' : 'save'}
              </button>
            </div>
            {addTodo.isError && (
              <>
                <small className="text-red-400 ">
                  Server returned: <span className="font-mono">{addTodo.error.message}</span>
                </small>
                <button
                  type="submit"
                  className="px-2 py-4 text-2xl text-purple-300 border-2 border-purple-300 rounded-2xl hover:bg-purple-300 hover:text-black "
                >
                  Try again?
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      {addTodo.isSuccess && <SuccessToast />}
    </>
  );
}
