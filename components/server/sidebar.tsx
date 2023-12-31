import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Channel, ChannelType, Member, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./header";
import { ServerSearch } from "./search";
import {
  HiHashtag,
  HiMicrophone,
  HiShieldCheck,
  HiShieldExclamation,
  HiVideoCamera,
} from "react-icons/hi";
import SidebarDivider from "./divider";
import { ServerSection } from "./section";
import { ServerChannel } from "./channel";
import { ServerMember } from "./member";
import { MemberWithProfile } from "@/types";

interface ServerSiderbarProps {
  serverId: string;
}

interface ServerSearchDataItem {
  label: string;
  type: "channel" | "member";
  data:
    | {
        icon: React.ReactNode;
        name: string;
        id: string;
      }[]
    | undefined;
}

interface Section {
  label: string;
  channels?: Channel[];
  members?: MemberWithProfile[];
}

const iconMap = {
  [ChannelType.TEXT]: <HiHashtag className="w-4 h-4" />,
  [ChannelType.AUDIO]: <HiMicrophone className="w-4 h-4" />,
  [ChannelType.VIDEO]: <HiVideoCamera className="w-4 h-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <HiShieldCheck className="w-4 h-4 text-indigo-500" />,
  [MemberRole.ADMIN]: <HiShieldExclamation className="w-4 h-4 text-danger" />,
};

export const ServerSidebar = async ({ serverId }: ServerSiderbarProps) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannels: Channel[] = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannels: Channel[] = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannels: Channel[] = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members: MemberWithProfile[] = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role: MemberRole = server.members.find(
    (member) => member.profileId === profile.id
  )!.role;

  const sections: Section[] = [
    { label: "Text Channels", channels: textChannels },
    { label: "Voice Channels", channels: audioChannels },
    { label: "Video Channels", channels: videoChannels },
    { label: "Members", members },
  ];

  const mapChannels = (
    channels: Channel[],
    iconMap: { [key: string]: React.ReactNode }
  ): ServerSearchDataItem["data"] =>
    channels?.map((channel) => {
      const { id, name, type } = channel;
      return {
        id,
        name,
        icon: iconMap[type],
      };
    });

  const mapMembers = (
    members: MemberWithProfile[],
    roleIconMap: { [key: string]: React.ReactNode }
  ): ServerSearchDataItem["data"] =>
    members?.map((member: MemberWithProfile) => {
      const { id, role } = member;
      const { name } = member.profile;
      return {
        id,
        name,
        icon: roleIconMap[role],
      };
    });

  const serverSearchData: ServerSearchDataItem[] = sections.map(
    ({ label, channels, members }: Section) => {
      const type = members ? "member" : "channel";
      const data = members
        ? mapMembers(members, roleIconMap)
        : mapChannels(channels!, iconMap);
      return { label, type, data };
    }
  );

  return (
    <div className="flex flex-col h-full w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <div className="flex-1 px-3">
        <ServerSearch data={serverSearchData} />
        <SidebarDivider />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
                role={role}
              />
            ))}
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            {audioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
                role={role}
              />
            ))}
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
                role={role}
              />
            ))}
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            {members.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
