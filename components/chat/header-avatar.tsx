"use client";
import { Avatar } from "@nextui-org/react";

export const ChatHeaderAvatar = ({ imageUrl }: { imageUrl?: string }) => {
  return <Avatar className="transition-transform w-7 h-7" src={imageUrl} />;
};
