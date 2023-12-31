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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import { ErrorMessage } from "@hookform/error-message";

interface FormInputs {
  channelName: string;
  channelType: string;
}

export const EditChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { channel, server } = data;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      channelName: channel?.name || "",
      channelType: channel?.type || ChannelType.TEXT,
    },
  });

  const isModalOpen = isOpen && type === "editChannel";

  const channelTypes = [
    { value: ChannelType.AUDIO },
    { value: ChannelType.VIDEO },
    { value: ChannelType.TEXT },
  ];

  const onSubmit = async (data: any) => {
    try {
      data.serverId = server?.id;
      setIsLoading(true);
      const response = await fetch(`/api/channels/${channel?.id}`, {
        method: "PATCH",
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

  useEffect(() => {
    if (channel) {
      setValue("channelName", channel?.name);
      setValue("channelType", channel?.type);
    } else {
      setValue("channelType", ChannelType.TEXT);
    }
  }, [channel, setValue]);

  const handleClose = () => {
    onClose();
  };

  const capitalize = (str: string) => {
    if (typeof str !== "string") return ""; // Ensure input is a string
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onOpenChange={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl mt-4">Edit Channel</h1>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    autoFocus
                    label={
                      <div>
                        Channel Name <span className="text-danger">*</span>
                      </div>
                    }
                    placeholder="Enter channel name"
                    variant="bordered"
                    labelPlacement="outside"
                    {...register("channelName", {
                      validate: (value) =>
                        value.toLowerCase() !== "general" ||
                        "Channel name cannot be 'general'.",
                    })}
                  />
                  <div className="text-danger text-xs">
                    <ErrorMessage errors={errors} name="channelName" />
                  </div>
                  <Select
                    label="Channel Type"
                    labelPlacement="outside"
                    placeholder="Select a channel type"
                    variant="bordered"
                    isRequired
                    {...register("channelType")}
                    selectedKeys={[channel?.type || ChannelType.TEXT]}
                  >
                    {channelTypes.map((channel) => (
                      <SelectItem key={channel.value} value={channel.value}>
                        {capitalize(channel.value)}
                      </SelectItem>
                    ))}
                  </Select>
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
