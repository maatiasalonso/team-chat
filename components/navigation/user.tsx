'use client';
import { SignOutButton } from '@clerk/nextjs';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export const NavigationUser = ({ profile }: any) => {
  const router = useRouter();
  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          as='button'
          className='w-12 h-12 transition-transform'
          src={profile.imageUrl}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='profile' className='gap-2 h-14'>
          <p className='font-semibold'>Signed in as</p>
          <p className='font-semibold'>{profile.email}</p>
        </DropdownItem>
        <DropdownItem key='logout' color='danger'>
          <SignOutButton
            signOutCallback={() => {
              router.push('/');
            }}
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
