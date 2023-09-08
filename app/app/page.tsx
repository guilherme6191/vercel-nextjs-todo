import { authConfig } from '@/pages/api/auth/[...nextauth]';
import { type Session } from 'next-auth';
import Todos from './todos';
import { Header } from '@/components/header';
import { fetchTodos } from '@/lib/db.server';
import { headers } from 'next/headers';

async function getSession(cookie: string): Promise<Session> {
  const baseUrl =
    process.env.VERCEL_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_VERCEL_URL;

  const response = await fetch(`${baseUrl}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function App() {
  const cookie = headers().get('cookie') ?? '';
  const { user } = await getSession(cookie);

  if (!user) {
    return <h1>no user</h1>;
  }

  const todos = await fetchTodos(user.email!);
  if (!user) return <h1>No user found!</h1>;
  return (
    <>
      <Header name={user.name!} image={user.image!} />
      <Todos userEmail={user.email!} initialTodos={todos} />
    </>
  );
}
