import type { Todos } from './xata.codegen.server';

export const getTodos = async (userEmail: string) => {
  const res = await fetch(`/api/get-todos?userEmail=${userEmail}`);
  const todos = await res.json();

  return todos;
};

export const updateTodo = async (checkbox: { id: string; checked: boolean; message: string }) => {
  const res = await fetch('/api/update-todo', {
    method: 'post',
    body: JSON.stringify({
      id: checkbox.id,
      is_done: checkbox?.checked,
    }),
  });
  const newTodo = await res.json();

  return newTodo;
};

export const addTodo = async (newTodo: Todos, userEmail: string) => {
  const response = await fetch('/api/add-todo', {
    method: 'post',
    body: JSON.stringify({
      newTodo,
      userEmail,
    }),
  });

  if (response.ok) {
    return response;
  } else {
    const err = await response.json();
    throw new Error(`ERROR [${response.status}]: ${err.message ?? 'The server returned an error'}`);
  }
};

export const deleteTodo = async (todoId: string) => {
  const response = await fetch('/api/delete-todo', {
    method: 'post',
    body: JSON.stringify({
      id: todoId,
    }),
  });

  if (response.ok) {
    return response;
  } else {
    const err = await response.json();
    throw new Error(`ERROR [${response.status}]: ${err.message ?? 'The server returned an error'}`);
  }
};
