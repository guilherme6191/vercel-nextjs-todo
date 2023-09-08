import { authConfig } from '@/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import Todos from './todos-wrapper';
import { Header } from '@/components/header';
import { fetchTodos } from '@/lib/db.server';

export default async function App() {
  const { user } = await unstable_getServerSession(authConfig);

  const todos = await fetchTodos(user.email);
  if (!user) return <h1>No user found!</h1>;
  return (
    <>
      <Header name={user.name} image={user.image} />
      <Todos userEmail={user.email} initialTodos={todos} />
    </>
  );
}
