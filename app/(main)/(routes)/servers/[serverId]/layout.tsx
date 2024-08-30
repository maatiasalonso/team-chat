import { ServerSidebar } from '@/components/server/sidebar';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) return redirect('/');

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect('/');

  return (
    <div className='h-full'>
      <div className='fixed inset-y-0 z-20 flex-col hidden h-full md:flex w-60'>
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className='h-full md:pl-60'>{children}</main>
    </div>
  );
};

export default ServerIdLayout;
