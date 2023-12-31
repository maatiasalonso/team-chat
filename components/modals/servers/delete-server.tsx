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

export const DeleteServerModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "deleteServer";
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await fetch(`/api/servers/${server?.id}`, {
        method: "DELETE",
      });

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
                <h1 className="text-2xl mt-4">Delete Server</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-center font-bold">
                  Are you sure you want to do this?
                </p>
                <p className="text-center text-danger">
                  <span className="font-bold"> {server?.name}</span> will be
                  permanently deleted.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isLoading}
                  className="w-full sm:w-auto hover:bg-zinc-500/90"
                  onPress={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={isLoading}
                  className="w-full sm:w-auto hover:bg-danger-500/90"
                  onPress={() => onClick()}
                >
                  {isLoading ? "Deleting server..." : "Confirm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
