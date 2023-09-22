"use client";

import { Button } from "@nextui-org/button";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  HiHashtag,
  HiLockClosed,
  HiMicrophone,
  HiPencilAlt,
  HiTrash,
  HiVideoCamera,
} from "react-icons/hi";
import { ActionTooltip } from "../action-tooltip";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: <HiHashtag className="w-4 h-4" />,
  [ChannelType.AUDIO]: <HiMicrophone className="w-4 h-4" />,
  [ChannelType.VIDEO]: <HiVideoCamera className="w-4 h-4" />,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  return (
    <>
      <Button
        variant="light"
        startContent={Icon}
        className="w-full justify-start mt-1 font-semibold pr-1"
      >
        {channel.name}
        {channel.name !== "general" && role !== MemberRole.GUEST && (
          <div className="flex items-center ml-auto">
            <ActionTooltip label="Edit">
              <Button size="sm" variant="light" isIconOnly>
                <HiPencilAlt className="hidden w-4 h-4 group-hover:block" />
              </Button>
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Button size="sm" variant="light" isIconOnly>
                <HiTrash className="hidden w-4 h-4 group-hover:block" />
              </Button>
            </ActionTooltip>
          </div>
        )}
        {channel.name === "general" && (
          <Button size="sm" variant="light" isIconOnly className="ml-auto">
            <HiLockClosed className="w-4 h-4 group-hover:block" />
          </Button>
        )}
      </Button>
    </>
  );
};
