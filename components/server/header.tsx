"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MemberRole } from "@prisma/client";
import { useState } from "react";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { useRoleActions } from "@/components/server/data/role/actions";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();
  const roleActions = useRoleActions({ role });

  const handleAction = (key: any) => {
    const action = roleActions.find((action) => action!.key === key);

    if (action) onOpen(action.method as ModalType, { server });
  };

  return (
    <>
      <Dropdown className="w-[230px] dark:bg-[#1E1F22]">
        <DropdownTrigger className="focus:outline-none">
          <Button
            className="w-full bg-zinc-200/50 dark:bg-zinc-900/10 text-md font-semibold rounded-none px-3 flex justify-between items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
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
        <DropdownMenu
          aria-label="Static Actions"
          items={roleActions}
          onAction={(key) => handleAction(key)}
        >
          {(item: any) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete-server" ? "danger" : "default"}
              className={item.hasOwnProperty("class") ? item.class : ""}
              endContent={item.icon}
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
