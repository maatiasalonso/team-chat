"use client";

import { Button, Image, Tooltip } from "@nextui-org/react";
import { UploadDropzone } from "@/lib/uploadthing";
import { HiX } from "react-icons/hi";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-40 mx-auto">
        <Image
          src={value}
          alt="Server Image"
          className="rounded-full w-40 h-40"
        />
        <Tooltip
          placement="top"
          showArrow
          content="Remove image"
          closeDelay={100}
        >
          <Button
            isIconOnly
            color="danger"
            size="sm"
            aria-label="Remove"
            className="rounded-full absolute top-0 right-0 z-50 hover:bg-danger-500/90 shadow-sm"
            onClick={() => {
              onChange("");
            }}
          >
            <HiX />
          </Button>
        </Tooltip>
      </div>
    );
  }
  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {}}
      />
    </>
  );
};

export default FileUpload;
