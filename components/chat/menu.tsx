"use client";

import { Button } from "@nextui-org/react";
import { HiMenu } from "react-icons/hi";

export const ChatMenu = () => {
  return (
    //TODO => Mobile navbar
    <div className="md:hidden">
      <Button variant="light" isIconOnly>
        <HiMenu className="w-4 h-4" />
      </Button>
    </div>
  );
};
