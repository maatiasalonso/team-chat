"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  Image,
  Link,
  cn,
} from "@nextui-org/react";
import { Member, MemberRole, Profile } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import {
  HiDocument,
  HiPencil,
  HiShieldCheck,
  HiShieldExclamation,
  HiTrash,
} from "react-icons/hi";
import { useState } from "react";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <HiShieldCheck className="w-4 h-4 text-indigo-500" />,
  ADMIN: <HiShieldExclamation className="w-4 h-4 text-danger" />,
};

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  function trimStringWithEllipsis(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
      return input;
    }

    const trimmedString = input.slice(0, maxLength - 3);
    return `${trimmedString}...`;
  }

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar
            className="transition-transform w-7 h-7"
            src={member.profile.imageUrl}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer mr-2">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <Card
              shadow="sm"
              isPressable
              onPress={() => window.open(fileUrl, "_blank")}
              className="w-60 mt-2"
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width={300}
                  height={200}
                  src={fileUrl}
                  alt="test"
                  isZoomed
                />
              </CardBody>
            </Card>
          )}
          {isPDF && (
            <Button
              variant="flat"
              color="secondary"
              startContent={<HiDocument className="w-7 h-7" />}
              as={Link}
              href={fileUrl}
              showAnchorIcon
              target="_blank"
              className="w-96 justify-start mt-2"
            >
              {trimStringWithEllipsis(fileUrl, 45)}
            </Button>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-10px mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 right-5">
          {canEditMessage && (
            <ActionTooltip label="Edit" placement="top">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setIsEditing(true)}
              >
                <HiPencil className="w-4 h-4" />
              </Button>
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete" placement="top">
            <Button isIconOnly variant="light" size="sm">
              <HiTrash className="w-4 h-4" />
            </Button>
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
