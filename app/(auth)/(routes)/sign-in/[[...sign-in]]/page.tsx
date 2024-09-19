import { SignIn } from '@clerk/nextjs';
import { TestUserCredentials } from './client';

export default function Page() {
  return (
    <section className='flex flex-col items-center gap-4'>
      <TestUserCredentials />
      <SignIn />
    </section>
  );
}
