"use client";

import React from "react";

import { Tooltip } from "@nextui-org/react";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  placement?:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end";
}

export const ActionTooltip = ({
  label,
  children,
  placement,
}: ActionTooltipProps) => {
  return (
    <Tooltip showArrow content={label} placement={placement} closeDelay={100}>
      {children}
    </Tooltip>
  );
};
