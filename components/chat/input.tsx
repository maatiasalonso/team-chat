"use client";

import { Input, Button } from "@nextui-org/react";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  return (
    <>
      <form>
        <Button></Button>
      </form>
    </>
  );
};
