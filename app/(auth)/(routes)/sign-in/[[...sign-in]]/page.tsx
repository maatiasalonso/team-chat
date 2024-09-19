import { auth, SignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await auth();

  if (user) {
    return redirect('/servers');
  }

  return <SignIn />;
}
