import { getServerSession } from 'next-auth';
import Todos from './todos';
import { Header } from '@/components/header';
import { fetchTodos } from '@/lib/db.server';
import { authConfig } from '@/lib/auth';

export default async function App() {
  const { user } = await getServerSession(authConfig);

  if (!user) return <h1>No user found!</h1>;

  const todos = await fetchTodos(user.email!);
  return (
    <>
      <Header name={user.name!} image={user.image!} />
      <Todos userEmail={user.email!} initialTodos={todos} />
    </>
  );
}
