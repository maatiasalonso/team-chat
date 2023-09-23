"use client";

import React, { useEffect, useState } from "react";
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

export const EditServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const { control, handleSubmit, setValue, register } = useForm({
    defaultValues: {
      imageUrl: server?.imageUrl || "",
      name: server?.name || "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isImageRemoved, setImageRemoved] = useState(false);

  const isModalOpen = isOpen && type === "editServer";

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/servers/${server?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to update server");
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

  useEffect(() => {
    if (server) {
      setValue("name", server?.name || "");
      setValue("imageUrl", server?.imageUrl || "");
    }
  }, [server, setValue]);

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
                    defaultValue={""}
                    render={({ field }) => (
                      <FileUpload
                        endpoint="serverImage"
                        value={
                          isImageRemoved
                            ? field.value
                            : server?.imageUrl || field.value
                        }
                        onChange={(url) => {
                          if (url === "") {
                            setImageRemoved(true);
                          }
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
                    {...register("name")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    className="w-full sm:w-auto hover:bg-blue-500"
                  >
                    {isLoading ? "Saving..." : "Save"}
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
