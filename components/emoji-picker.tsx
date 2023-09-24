"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { HiEmojiHappy } from "react-icons/hi";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}
export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  console.log(resolvedTheme);
  return (
    <>
      <Popover showArrow={true}>
        <PopoverTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <HiEmojiHappy className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Picker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
