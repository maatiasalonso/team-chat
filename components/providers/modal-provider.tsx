"use client";

import { CreateServerModal } from "@/components/modals/create-server";
import { useEffect, useState } from "react";
import { InvitePeopleModal } from "@/components/modals/invite-people";
import { EditServerModal } from "@/components/modals/edit-server";
import { ManageMembersModal } from "@/components/modals/manage-members";
import { CreateChannelModal } from "@/components/modals/create-channel";
import { LeaveServerModal } from "../modals/leave-server";

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
      <ManageMembersModal />
      <CreateChannelModal />
      <InvitePeopleModal />
    </>
  );
};
