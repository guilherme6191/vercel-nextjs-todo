import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { GithubLogin } from '@/components/github-login';
import { authConfig } from '@/lib/auth';
import { ModeToggle } from '@/components/theme-toggle';
import { Menubar, MenubarMenu } from '@/components/ui/menubar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const isAuthed = Boolean(await getServerSession(authConfig));

  return (
    <>
      <Menubar className="justify-between h-14 px-4">
        <MenubarMenu>
          <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={70} height={70} priority />
        </MenubarMenu>
        <MenubarMenu>
          <ModeToggle />
        </MenubarMenu>
      </Menubar>

      <main className="flex w-screen h-screen items-center justify-center">
        <Card className="w-1/4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Access with:</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            {!isAuthed ? (
              <GithubLogin />
            ) : (
              <Button asChild>
                <a href="/app"> Start doing</a>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
