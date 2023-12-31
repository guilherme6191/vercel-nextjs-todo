import { getXataClient, Todos, TodosRecord } from '@/lib/xata.codegen.server';

const xata = getXataClient();

export type AddTodoParams = {
  todo: Todos;
  userEmail: string;
};

export const addTodo = async ({ todo, userEmail }: AddTodoParams) => {
  const user = await xata.db.users.filter({ email: userEmail }).getFirst();

  if (!user) throw new Error('User not found');
  
  return xata.db.todos.create({
    ...todo,
    created_at: todo.created_at,
    user: user.id,
  });
};

export type TodoRecords = Awaited<ReturnType<typeof fetchTodos>>;

export const getTodoByMessage = async (message: string) => {
  const todo = await xata.db.todos.filter({ message }).getFirst();
  return todo;
};

export const fetchTodos = async (email: string) => {
  const todos = await xata.db.todos
    .filter({
      user: {
        email,
      },
    })
    .sort('created_at', 'desc')
    .getAll();

  return todos;
};

export const toggleTodo = async (id: TodosRecord['id'], is_done: TodosRecord['is_done']) => {
  const newTodo = await xata.db.todos.update({ id, is_done });
  return newTodo;
};

export const deleteTodo = async (id: TodosRecord['id']) => {
  const res = await xata.db.todos.delete(id);
  return res;
};
