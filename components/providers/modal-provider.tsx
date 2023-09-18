"use client";

import { CreateServerModal } from "@/components/modals/create-server";
import { useEffect, useState } from "react";
import { InvitePeopleModal } from "@/components/modals/invite-people";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InvitePeopleModal />
    </>
  );
};
