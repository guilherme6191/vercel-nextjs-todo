import type { NextApiRequest, NextApiResponse } from 'next';
import { addTodo } from '@/lib/db.server';
import { Todos } from '@/lib/xata.codegen.server';

type ResponseData = Readonly<Todos> | { message: string };
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { userEmail, newTodo } = JSON.parse(req.body);

  // force an error for demonstration purposes
  if (newTodo.message === 'invalid') {
    res.status(500).send({ message: 'Invalid todo' });
  }

  const todo = await addTodo({ todo: newTodo, userEmail });

  if (!todo) {
    res.status(400).send({ message: 'Something went wrong' });
  }

  res.status(200).json(todo);
}
