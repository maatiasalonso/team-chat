"use client";

import { useEffect, useState } from "react";
import { CreateChannelModal } from "@/components/modals/channels/create-channel";
import { CreateServerModal } from "@/components/modals/servers/create-server";
import { DeleteChannelModal } from "@/components/modals/channels/delete-channel";
import { DeleteMessageModal } from "@/components/modals/channels/delete-message";
import { DeleteServerModal } from "@/components/modals/servers/delete-server";
import { EditChannelModal } from "@/components/modals/channels/edit-channel";
import { EditServerModal } from "@/components/modals/servers/edit-server";
import { InvitePeopleModal } from "@/components/modals/invite-people";
import { LeaveServerModal } from "@/components/modals/servers/leave-server";
import { ManageMembersModal } from "@/components/modals/manage-members";
import { MessageFileModal } from "@/components/modals/channels/message-file";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateChannelModal />
      <CreateServerModal />
      <DeleteChannelModal />
      <DeleteMessageModal />
      <DeleteServerModal />
      <EditChannelModal />
      <EditServerModal />
      <InvitePeopleModal />
      <LeaveServerModal />
      <ManageMembersModal />
      <MessageFileModal />
    </>
  );
};
