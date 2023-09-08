import { type TodoProps } from '@/lib/db.server';
import { useUpdateTodo } from '@/lib/hooks/update-todo';

export function TodoList({ list }: { list: TodoProps[] }) {
  const { mutate: mutateTodo } = useUpdateTodo();

  return (
    <ul className="w-full mx-auto pt-20 px-4">
      {list.map((item) => (
        <li
          key={item.id}
          className="flex justify-between w-full py-1 my-4 text-left border-b-2 border-dotted border-b-gray-400 border-opacity-40"
        >
          <label
            htmlFor={item.id}
            className="relative flex cursor-pointer items-center rounded-full p-3"
            for={item.id}
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
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <label
            className={`mt-px cursor-pointer select-none font-light text-white text-3xl ${
              item.is_done ? 'line-through' : ''
            }`}
          >
            {item.message}
          </label>
        </li>
      ))}
    </ul>
  );
}
