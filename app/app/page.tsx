// import { fetchTodos } from '~/lib/db.server';
import { authConfig } from '@/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import Todos from './todos-wrapper';
import { Header } from '@/components/header';

export default async function App() {
  const { user } = await unstable_getServerSession(authConfig);
  console.log('🚀 ~ file: page.tsx:8 ~ TodosPage ~ user:', user);
  // const todos = await fetchTodos(user.email);
  if (!user) return <h1>No user found!</h1>;
  return (
    <>
      <Header name={user.name} image={user.image} />
      <span>test</span>
      {/* <Todos userEmail={user.email} initialTodos={todos} /> */}
    </>
  );
}
