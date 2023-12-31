"use client";

import { Button } from "@nextui-org/button";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  HiHashtag,
  HiLockClosed,
  HiMicrophone,
  HiOutlineDotsVertical,
  HiPencil,
  HiTrash,
  HiVideoCamera,
} from "react-icons/hi";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

interface ServerAction {
  label: string;
  icon: React.ReactNode;
  modal: ModalType;
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
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const serverActions: ServerAction[] = [
    {
      label: "Edit",
      icon: <HiPencil className="w-4 h-4" />,
      modal: "editChannel",
    },
    {
      label: "Delete",
      icon: <HiTrash className="w-4 h-4" />,
      modal: "deleteChannel",
    },
  ];

  return (
    <div className="flex relative items-center group">
      <Button
        variant="light"
        startContent={Icon}
        className="w-full justify-start mt-0.5 font-semibold pr-1"
        onPress={() => onClick()}
      >
        {channel.name}
      </Button>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly size="sm">
              <HiOutlineDotsVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Server Actions" items={serverActions}>
            {(item: ServerAction) => (
              <DropdownItem
                key={item.label}
                color={
                  cn(
                    item.modal === "deleteChannel" ? "danger" : "default"
                  ) as any
                }
                className={cn(item.modal === "deleteChannel" && "text-danger")}
                onPress={() => onOpen(item.modal, { server, channel })}
                startContent={item.icon}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};
