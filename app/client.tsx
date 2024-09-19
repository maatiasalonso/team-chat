'use client';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import Link from 'next/link';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { ThemeSwitch } from '@/components/theme-switch';
import { useState } from 'react';

type NavbarMainProps = {
  user: any;
};

export const NavbarMain = ({ user }: NavbarMainProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      key: 'features',
      title: 'Features',
      href: 'features',
    },
    {
      key: 'about',
      title: 'About',
      href: 'about',
    },
    {
      key: 'contact',
      title: 'Contact',
      href: 'contact',
    },
  ];

  const handleNavItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = (e.target as HTMLButtonElement)
      .getAttribute('href')
      ?.substring(1);
    const element = document.getElementById(id!);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='dark:bg-zinc-800'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link
            className='flex items-center justify-center gap-2 hover:opacity-80'
            href='/'
          >
            <HiOutlineChatAlt2 className='w-6 h-6' />
            <span className='font-bold uppercase'>Chatter</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
        {menuItems.map((item) => (
          <NavbarItem key={item.key}>
            <Button
              key={item.key}
              variant='light'
              className='text-sm font-medium'
              href={`#${item.href}`}
              onClick={handleNavItem}
            >
              {item.title}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='flex items-center gap-2'>
          {user ? (
            <Button
              variant='light'
              className='text-sm font-medium'
              href={`/sign-in`}
              as={Link}
            >
              Log In
            </Button>
          ) : (
            <Button
              variant='light'
              className='text-sm font-medium'
              href={`/servers`}
              as={Link}
            >
              Go to Servers
            </Button>
          )}
          <ThemeSwitch placement='bottom' />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className='w-full'
              href={`#${item.href}`}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
