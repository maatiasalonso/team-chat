"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Button } from "@nextui-org/button";
import { HiCog, HiPlus } from "react-icons/hi";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between">
      <p className="uppercase text-xs font-semibold">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" placement="top">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => onOpen("createChannel", { channelType })}
          >
            <HiPlus className="w-4 h-4" />
          </Button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" placement="top">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => onOpen("members", { server })}
          >
            <HiCog className="w-4 h-4" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  );
};
