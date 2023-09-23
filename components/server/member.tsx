"use client";

import { Avatar, Button } from "@nextui-org/react";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { HiShieldCheck, HiShieldExclamation } from "react-icons/hi";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <HiShieldCheck className="ml-auto w-4 h-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: (
    <HiShieldExclamation className="ml-auto w-4 h-4 text-danger" />
  ),
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const Icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params.serverId}/conversations/${member.id}`);
  };

  return (
    <>
      <Button
        endContent={Icon}
        variant="light"
        className="w-full justify-start mt-1"
        onPress={() => onClick()}
      >
        <Avatar
          className="transition-transform w-7 h-7"
          src={member.profile.imageUrl}
        />
        {member.profile.name}
      </Button>
    </>
  );
};
