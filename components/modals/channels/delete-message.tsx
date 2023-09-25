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

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "deleteMessage";
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = `${apiUrl}?channelId=${query?.channelId}&serverId=${query?.serverId}`;

      await fetch(url, {
        method: "DELETE",
      });

      onClose();
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
                <h1 className="text-2xl mt-4">Delete Message</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-center font-bold">
                  Are you sure you want to do this?
                </p>
                <p className="text-center text-danger">
                  The message will be permanently deleted.
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
                  {isLoading ? "Deleting message..." : "Confirm"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
