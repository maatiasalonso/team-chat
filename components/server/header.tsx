"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  HiChevronDown,
  HiUserAdd,
  HiCog,
  HiUsers,
  HiPlusCircle,
  HiTrash,
  HiLogout,
  HiChevronUp,
} from "react-icons/hi";
import { MemberRole } from "@prisma/client";
import { useState } from "react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    ...(isModerator
      ? [
          {
            key: "invite-people",
            label: "Invite People",
            class: "text-indigo-600 dark:text-indigo-400",
            icon: <HiUserAdd className="w-5 h-5" />,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            key: "server-settings",
            label: "Server Settings",
            icon: <HiCog className="w-5 h-5" />,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            key: "manage-members",
            label: "Manage Members",
            icon: <HiUsers className="w-5 h-5" />,
          },
        ]
      : []),
    ...(isModerator
      ? [
          {
            key: "create-channel",
            label: "Create Channel",
            icon: <HiPlusCircle className="w-5 h-5" />,
            divider: true,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            key: "delete-server",
            label: "Delete Server",
            icon: <HiTrash className="w-5 h-5" />,
            class: "text-danger",
          },
        ]
      : []),
    ...(!isAdmin
      ? [
          {
            key: "leave-server",
            label: "Leave Server",
            icon: <HiLogout className="w-5 h-5" />,
          },
        ]
      : []),
  ];

  return (
    <>
      <Dropdown className="w-[230px] dark:bg-[#1E1F22]">
        <DropdownTrigger className="focus:outline-none">
          <Button
            className="w-full bg-zinc-900/10 text-md font-semibold rounded-none px-3 flex justify-between items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            endContent={
              !isOpen ? (
                <HiChevronDown className="w-5 h-5" />
              ) : (
                <HiChevronUp className="w-5 h-5" />
              )
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            {server.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" items={items}>
          {(item: any) => (
            <DropdownItem
              key={item.hasOwnProperty("key") ? item.key : null}
              color={
                item.hasOwnProperty("key")
                  ? item.key === "delete-server"
                    ? "danger"
                    : "default"
                  : "default"
              }
              className={item.hasOwnProperty("class") ? item.class : ""}
              endContent={item.hasOwnProperty("icon") ? item.icon : ""}
              showDivider={
                item.hasOwnProperty("divider") ? item.divider : false
              }
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
