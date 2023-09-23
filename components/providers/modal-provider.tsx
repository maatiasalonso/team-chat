"use client";

import { CreateServerModal } from "@/components/modals/servers/create-server";
import { useEffect, useState } from "react";
import { InvitePeopleModal } from "@/components/modals/invite-people";
import { EditServerModal } from "@/components/modals/servers/edit-server";
import { ManageMembersModal } from "@/components/modals/manage-members";
import { CreateChannelModal } from "@/components/modals/channels/create-channel";
import { LeaveServerModal } from "../modals/servers/leave-server";
import { DeleteServerModal } from "../modals/servers/delete-server";
import { DeleteChannelModal } from "../modals/channels/delete-channel";
import { EditChannelModal } from "../modals/channels/edit-channel";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <EditChannelModal />
      <DeleteChannelModal />
      <InvitePeopleModal />
    </>
  );
};
