import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTodo } from '@/lib/db.server';

type ResponseData = { message: string };
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { id } = JSON.parse(req.body);
  const result = await deleteTodo(id);

  if (!result) {
    console.error('Failed to delete todo');
    res.status(400).send({ message: 'Failed to delete todo' });
    return;
  }

  res.send({ message: 'ok' });
}
