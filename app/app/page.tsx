import { getServerSession } from 'next-auth';
import Todos from './todos';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import Image from 'next/image';
import { authConfig } from '@/lib/auth';
import { ModeToggle } from '@/components/theme-toggle';
import { LogoutButton } from '@/components/logout-button';

export default async function App() {
  const { user } = await getServerSession(authConfig);
  if (!user) return <h1>No user found!</h1>;

  return (
    <>
      <Menubar className="justify-end h-14 px-4">
        <MenubarMenu>
          <MenubarTrigger>
            <Image className="rounded-full" src={user.image} alt="Next.js Logo" width={30} height={30} priority />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>{user.name}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <ModeToggle />
        </MenubarMenu>
        <MenubarMenu>
          <LogoutButton />
        </MenubarMenu>
      </Menubar>
      <Todos userEmail={user.email!} />
    </>
  );
}
