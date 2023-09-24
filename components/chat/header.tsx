import { HiHashtag } from "react-icons/hi";
import { ChatMenu } from "./menu";
import { ChatHeaderAvatar } from "./header-avatar";
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="font-semibold border-b-2 border-neutral-200 px-3 dark:border-neutral-800 h-12 flex items-center">
      <ChatMenu />
      {type === "channel" && <HiHashtag className="w-4 h-4 ml-2" />}
      {type === "conversation" && <ChatHeaderAvatar imageUrl={imageUrl} />}
      <p className="ml-2 font-semibold">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};
