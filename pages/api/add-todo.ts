import type { NextApiRequest, NextApiResponse } from 'next';
import { TodoProps, addTodo, fetchTodos, getTodoByMessage } from '@/lib/db.server';

type ResponseData = TodoProps | { message: string };
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { userEmail, newTodo } = JSON.parse(req.body);
  console.log('🚀 ~ file: add-todo.ts:8 ~ constaddTodos:NextApiHandler= ~ newTodo:', newTodo);

  // force an error for demonstration purposes
  if (newTodo.message === 'invalid') {
    res.status(400).send({ message: 'Invalid todo' });
  }

  const todo = await addTodo({ todo: newTodo, userEmail });

  // res.send(todo);
  res.status(200).json(todo);
}
