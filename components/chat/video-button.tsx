"use client";

import { LuVideo, LuVideoOff } from "react-icons/lu";
import { ActionTooltip } from "../action-tooltip";
import { Button } from "@nextui-org/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ChatVideoButton = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const Icon = isVideo ? LuVideoOff : LuVideo;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  const onClick = () => {
    const videoPath = `?video=${isVideo ? undefined : true}`;
    const url = `${pathName}${!isVideo ? videoPath : ""}`;

    router.push(url);
  };
  return (
    <ActionTooltip placement="bottom" label={tooltipLabel}>
      <Button
        isIconOnly
        onPress={() => onClick()}
        className="hover:opacity-75 transition mr-4"
        size="sm"
      >
        <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
      </Button>
    </ActionTooltip>
  );
};
