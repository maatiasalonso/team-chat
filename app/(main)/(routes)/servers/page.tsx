import InitialModal from '@/components/modals/initial';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';

const ServersPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!server) {
    return <InitialModal />;
  }

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== 'general') return null;

  return redirect(`/servers/${server.id}/channels/${initialChannel?.id}`);
};

export default ServersPage;
