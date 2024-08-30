'use client';
import {
  HiOutlineChatAlt2,
  HiOutlineUsers,
  HiOutlineVideoCamera,
} from 'react-icons/hi';
import Link from 'next/link';
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
} from '@nextui-org/react';
import { ThemeSwitch } from '@/components/theme-switch';
import { useState } from 'react';

export default function MainPage() {
  return (
    <div className='flex flex-col min-h-[100dvh]'>
      {/* <Header /> */}
      <NavbarMain />
      <main className='flex-1'>
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>
      <footer className='flex flex-col items-center w-full gap-2 px-4 py-6 sm:flex-row shrink-0 md:px-6 dark:bg-zinc-800 bg-zinc-100'>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          © 2023 Chatter Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const NavbarMain = () => {
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
          <Button
            variant='light'
            className='text-sm font-medium'
            href={`/sign-in`}
            as={Link}
          >
            Log In
          </Button>
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

const Hero = () => {
  return (
    <section className='w-full py-12 text-white bg-zinc-900 md:py-24 lg:py-32 xl:py-48'>
      <div className='px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
              Welcome to Chatter
            </h1>
            <p className='mx-auto max-w-[700px] text-zinc-400 md:text-xl dark:text-zinc-400'>
              Connect, collaborate, and communicate with ease. Join millions of
              users on the most versatile platform for communities and teams.
            </p>
          </div>
          <div className='w-full max-w-sm space-y-2'>
            <form className='flex space-x-2'>
              <Input
                className='flex-1 max-w-lg'
                placeholder='Enter your email'
                type='email'
                size='sm'
              />
              <Tooltip content='This is a dummy button' closeDelay={300}>
                <Button
                  className='text-black bg-white hover:bg-zinc-200'
                  type='submit'
                >
                  Get Started
                </Button>
              </Tooltip>
            </form>
            <p className='text-xs text-zinc-400'>
              Start chatting now. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: 'Communities',
      description: 'Join or create communities around your interests.',
      icon: HiOutlineUsers,
    },
    {
      title: 'Messaging',
      description: 'Send messages, share files, and collaborate in real-time.',
      icon: HiOutlineChatAlt2,
    },
    {
      title: 'Voice & Video',
      description: 'Crystal-clear voice and video calls with screen sharing.',
      icon: HiOutlineVideoCamera,
    },
  ];

  return (
    <section
      id='features'
      className='flex justify-center w-full py-12 bg-zinc-100 dark:bg-zinc-800 md:py-24 lg:py-32'
    >
      <div className='w-full max-w-6xl px-4 md:px-6'>
        <div className='grid items-center justify-center gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-col items-center space-y-4 text-center'
            >
              <feature.icon className='w-12 h-12 text-zinc-600 dark:text-zinc-400' />
              <h2 className='text-2xl font-bold'>{feature.title}</h2>
              <p className='max-w-[200px] text-zinc-500 dark:text-zinc-400'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section
      id='about'
      className='w-full py-12 md:py-24 lg:py-32 dark:bg-zinc-900'
    >
      <div className='px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Join Our Growing Community
            </h2>
            <p className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'>
              Millions of users and thousands of communities are waiting for
              you. Dive into discussions, share your passions, and make new
              connections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section
      id='contact'
      className='w-full py-12 bg-zinc-100 md:py-24 lg:py-32 dark:bg-zinc-800'
    >
      <div className='px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Ready to Get Started?
            </h2>
            <p className='max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'>
              Join Chatter today and experience the future of communication.
            </p>
          </div>
          <div className='w-full max-w-sm space-y-2'>
            <Button
              type='submit'
              className='text-white dark:text-black bg-zinc-900 dark:bg-white dark:hover:bg-zinc-200 hover:bg-zinc-900/90'
              href='/sign-up'
              as={Link}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
