"use client";

import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { cn } from "@nextui-org/react";

interface NavigationItemsProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({
  id,
  imageUrl,
  name,
}: NavigationItemsProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} placement="right">
      <div className="relative flex items-center group">
        <div
          className={cn(
            "absolute left-0 rounded-r-full transition-all w-[4px] bg-zinc-200",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <Button
          className={cn(
            "w-12 h-12 rounded-full hover:rounded-2xl mx-auto",
            params?.serverId === id && "rounded-2xl"
          )}
          isIconOnly
          onClick={onClick}
        >
          <Image
            width={1000}
            height={1000}
            as={NextImage}
            src={imageUrl}
            alt="Channel"
            isZoomed
            isBlurred
            className="h-14"
          />
        </Button>
      </div>
    </ActionTooltip>
  );
};
