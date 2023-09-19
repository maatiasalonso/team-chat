"use client";

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "leaveServer";
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await fetch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={onClose}
        hideCloseButton={isLoading}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl mt-4">Leave Server</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-center">
                  Are you sure you want to leave
                  <span className="text-indigo-500"> {server?.name}</span>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  className="w-full sm:w-auto hover:bg-zinc-500/90"
                  onPress={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  className="w-full sm:w-auto hover:bg-blue-500"
                  onPress={() => onClick()}
                >
                  {isLoading ? "Leaving server..." : "Confirm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
