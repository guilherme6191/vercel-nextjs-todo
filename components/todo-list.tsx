import { type TodoProps } from '@/lib/db.server';
import { useDeleteTodo } from '@/lib/hooks/delete-todo';
import { useUpdateTodo } from '@/lib/hooks/update-todo';
import { SuccessToast } from './success-toast';
import { useEffect } from 'react';

export function TodoList({ list }: { list: TodoProps[] }) {
  const { mutate: mutateTodo } = useUpdateTodo();
  const { mutate: mutateDeleteTodo, isSuccess: isDeleteSuccess, reset: deleteTodoReset } = useDeleteTodo();

  useEffect(() => {
    let clearMutation: NodeJS.Timeout | undefined = undefined;

    if (isDeleteSuccess) {
      clearMutation = setTimeout(() => {
        deleteTodoReset();
      }, 3000);
    }

    return () => {
      clearTimeout(clearMutation);
    };
  }, [isDeleteSuccess]);

  return (
    <ul className="w-full mx-auto pt-14 px-4">
      {list.map((item) => (
        <li
          key={item.id}
          className="flex justify-between w-full py-1 my-4 text-left border-b-2 border-dotted border-b-gray-400 border-opacity-40"
        >
          <div className="flex items-center gap-2">
            <label
              htmlFor={item.id}
              className="relative flex cursor-pointer items-center rounded-full p-3"
              data-ripple-dark="true"
            >
              <input
                id={item.id}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                type="checkbox"
                value={item.message}
                defaultChecked={item.is_done}
                onChange={(evt) => {
                  mutateTodo({
                    id: evt.currentTarget.id,
                    message: evt.currentTarget.value,
                    checked: evt.currentTarget.checked,
                  });
                }}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-600 cursor-pointer hover:text-red-700 transition-all"
              onClick={() => {
                mutateDeleteTodo(item.id);
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <label
            className={`mt-px cursor-pointer select-none font-light text-white text-3xl ${
              item.is_done ? 'line-through' : ''
            }`}
          >
            {item.message}
          </label>
        </li>
      ))}
      {isDeleteSuccess && <SuccessToast />}
    </ul>
  );
}
