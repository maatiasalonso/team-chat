"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEmojiHappy, HiPlus } from "react-icons/hi";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const { control, handleSubmit, register, getValues, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      apiUrl = `${apiUrl}?channelId=${encodeURIComponent(
        query.channelId
      )}&serverId=${encodeURIComponent(query.serverId)}`;

      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <form className="mx-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          isDisabled={isLoading}
          startContent={
            <Button
              isIconOnly
              radius="full"
              size="sm"
              color="secondary"
              className="mr-2 h-6 w-8 min-w-unit-1"
              onPress={() => onOpen("messageFile", { apiUrl, query })}
            >
              <HiPlus className="w-4 h-4" />
            </Button>
          }
          endContent={
            <Button isIconOnly radius="full" size="sm" variant="light">
              <HiEmojiHappy className="w-5 h-5" />
            </Button>
          }
          placeholder={`Message ${type === "conversation" ? name : `#${name}`}`}
          {...register("content")}
        ></Input>
      </form>
    </>
  );
};
