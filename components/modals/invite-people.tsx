"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { HiCheckCircle, HiDuplicate, HiRefresh } from "react-icons/hi";

export const InvitePeopleModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/servers/${server?.id}/invite-code`, {
        method: "PATCH",
      });

      const serverData = await response.json();

      onOpen("invite", { server: serverData });
    } catch (error) {
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
                <h1 className="text-2xl mt-4">Invite Friends</h1>
              </ModalHeader>
              <ModalBody>
                <div className="flex items-end gap-2">
                  <Input
                    autoFocus
                    label="Invite Link"
                    placeholder="Enter your email"
                    variant="bordered"
                    labelPlacement="outside"
                    value={inviteUrl}
                    isDisabled={isLoading}
                  />
                  <Tooltip
                    placement="top"
                    showArrow
                    content={copied ? "Copied" : "Copy Link"}
                    closeDelay={100}
                  >
                    <Button
                      isIconOnly
                      variant="bordered"
                      aria-label="Like"
                      onClick={onCopy}
                      isDisabled={isLoading}
                    >
                      {copied ? (
                        <HiCheckCircle className="w-5 h-5" />
                      ) : (
                        <HiDuplicate className="w-5 h-5" />
                      )}
                    </Button>
                  </Tooltip>
                </div>
                <Button
                  onClick={onNew}
                  endContent={!isLoading && <HiRefresh className="w-4 h-4" />}
                  variant="light"
                  className="justify-start"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  {isLoading ? "Generating new link..." : "Generate new link"}
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
