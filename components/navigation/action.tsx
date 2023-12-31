"use client";

import { HiPlus } from "react-icons/hi";
import { Button } from "@nextui-org/react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const Action = () => {
  const { onOpen } = useModal();

  return (
    <>
      <ActionTooltip label="Add a server" placement="right">
        <Button
          className="w-12 h-12 rounded-full hover:rounded-2xl hover:bg-emerald-500 group transition-all"
          isIconOnly
          onClick={() => onOpen("createServer")}
        >
          <HiPlus className="w-5 h-5 text-emerald-500 group-hover:text-white group-hover:scale-110 transition-all" />
        </Button>
      </ActionTooltip>
    </>
  );
};
