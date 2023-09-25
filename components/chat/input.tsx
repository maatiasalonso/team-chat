"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiPlus } from "react-icons/hi";
import { EmojiPicker } from "../emoji-picker";
import { useRouter } from "next/navigation";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const { handleSubmit, register, setValue, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      setValue("content", "");
      router.refresh();
    }
  };

  return (
    <>
      <form className="mx-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          isDisabled={isLoading}
          size="lg"
          startContent={
            <Button
              isIconOnly
              radius="full"
              size="sm"
              color="secondary"
              className="mr-2 h-6 w-7 min-w-unit-1"
              onPress={() => onOpen("messageFile", { apiUrl, query })}
            >
              <HiPlus className="w-4 h-4" />
            </Button>
          }
          endContent={
            <EmojiPicker
              onChange={(emoji: string) =>
                setValue("content", `${getValues("content") || ""} ${emoji}`)
              }
            />
          }
          placeholder={`Message ${type === "conversation" ? name : `#${name}`}`}
          {...register("content")}
        ></Input>
      </form>
    </>
  );
};
