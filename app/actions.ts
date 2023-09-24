'use server';

import { getXataClient, Todos, TodosRecord } from '@/lib/xata.codegen.server';
import { nanoid } from 'nanoid';
import { revalidatePath, revalidateTag } from 'next/cache';

const xata = getXataClient();

export const fetchTodos = async (email: string) => {
  try {
    const todos = await xata.db.todos
      .filter({
        user: {
          email,
        },
      })
      .sort('created_at', 'desc')
      .getAll();

    return todos;
  } catch (e) {
    console.error(e);
  }
};

export async function addTodoAction(data: FormData, userEmail: string) {
  const message = data.get('message') as string;
  if (!message || message.toLowerCase() === 'invalid') return { error: 'Invalid message.' };

  const todo: Todos = {
    id: nanoid(),
    message,
    is_done: false,
    created_at: new Date(),
  };

  try {
    const user = await xata.db.users.filter({ email: userEmail }).getFirst();

    if (!user) return { error: 'User not found' };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await xata.db.todos.create({
      ...todo,
      created_at: todo.created_at,
      user: user.id,
    });

    return !res ? { error: 'There was an error.' } : { message: 'Success!' };
  } catch (e) {
    return { error: 'There was an error.' };
  } finally {
    revalidatePath('/app');
  }
}

export const toggleTodo = async (id: TodosRecord['id'], is_done: TodosRecord['is_done']) => {
  try {
    const newTodo = await xata.db.todos.update({ id, is_done });
    return newTodo;
  } catch (e) {
    console.error(e);
  } finally {
    revalidatePath('/app');
  }
};

export const deleteTodo = async (id: TodosRecord['id']) => {
  try {
    const res = await xata.db.todos.delete(id);
    return res;
  } catch (e) {
    console.error(e);
  } finally {
    revalidatePath('/app');
  }
};
