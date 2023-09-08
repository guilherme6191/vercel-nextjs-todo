import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { LogoutButton } from './logout-button';

export function Header({ name, image }: { name: string; image: string }) {
  return (
    <header>
      <nav className="shadow-md shadow-cyan-500/50 px-4 lg:px-6 py-2.5 mb-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <Image className="rounded-full mr-2" src={image} alt="Next.js Logo" width={50} height={50} priority />
            <span className="self-center text-sm font-semibold whitespace-nowrap dark:text-white">{name}</span>
          </div>
          <div className="flex items-center lg:order-2">
            <LogoutButton />
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
