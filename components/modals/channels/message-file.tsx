"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import FileUpload from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;
  const { control, handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === "messageFile";

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: any) => {
    try {
      data.content = data.fileUrl;
      setIsLoading(true);
      const response = await fetch(
        `${apiUrl}?channelId=${query?.channelId}&serverId=${query?.serverId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create server");
      }

      setIsLoading(false);
      router.refresh();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl mt-4">Add an attachment</h1>
                <p className="text-sm text-zinc-400 mt-2">
                  Send a file as a message
                </p>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Controller
                    name="fileUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={(url) => {
                          field.onChange(url);
                        }}
                      />
                    )}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    className="w-full sm:w-auto hover:bg-blue-500"
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
