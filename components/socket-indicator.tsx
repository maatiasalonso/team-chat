"use client";

import { HiCheck } from "react-icons/hi";
import { useSocket } from "./providers/socket-provider";
import { Button, Chip, Spinner } from "@nextui-org/react";
import { useState } from "react";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();
  const [iconOnly, setIconOnly] = useState(false);

  if (!isConnected) {
    return (
      <Chip
        startContent={<Spinner size="sm" color="default" />}
        color="warning"
        className="px-2 gap-x-2 items-center"
      >
        <span className="my-auto font-semibold text-white">Connecting...</span>
      </Chip>
    );
  }

  setTimeout(() => {
    setIconOnly(true);
  }, 2500);

  return (
    <>
      <Button
        isIconOnly
        color="success"
        size="sm"
        radius="full"
        className={iconOnly ? "h-7 min-w-unit-1 w-7" : "w-36 h-7"}
        startContent={
          !iconOnly && <HiCheck className="w-5 h-5 text-white mr-2" />
        }
      >
        {!iconOnly && (
          <span className="my-auto font-semibold text-white text-base">
            Connected
          </span>
        )}
        {iconOnly && <HiCheck className="w-5 h-5 text-white" />}
      </Button>
    </>
  );
};
