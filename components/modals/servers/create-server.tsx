"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import FileUpload from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { control, handleSubmit, register } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === "createServer";

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to create server");
      }

      setIsLoading(false);
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl mt-4">Customize your server</h1>
                <p className="text-sm text-zinc-400 mt-2">
                  Give your server a personality with a name and an image. You
                  can always change it later.
                </p>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Controller
                    name="imageUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={(url) => {
                          field.onChange(url);
                        }}
                      />
                    )}
                  />
                  <Input
                    autoFocus
                    label="Server Name"
                    placeholder="Enter server name"
                    variant="bordered"
                    isRequired
                    labelPlacement="outside"
                    {...register("serverName")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    className="w-full sm:w-auto hover:bg-blue-500"
                  >
                    {isLoading ? "Creating..." : "Create"}
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
