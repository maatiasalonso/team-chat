"use client";

import { Button, Image, Tooltip } from "@nextui-org/react";
import { UploadDropzone } from "@/lib/uploadthing";
import { HiDocument, HiX } from "react-icons/hi";
import { Link } from "@nextui-org/link";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  function trimStringWithEllipsis(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
      return input;
    }

    const trimmedString = input.slice(0, maxLength - 3);
    return `${trimmedString}...`;
  }

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-40 mx-auto">
        <Image
          src={value}
          alt="Server Image"
          className="rounded-full w-40 h-40 object-cover"
          width={1000}
          height={1000}
        />
        <Tooltip
          placement="top"
          showArrow
          content="Remove"
          closeDelay={100}
          color="danger"
        >
          <Button
            isIconOnly
            color="danger"
            size="sm"
            aria-label="Remove"
            className="rounded-full absolute top-0 right-0 z-50 hover:opacity-40 transition-all shadow-sm"
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

  if (value && fileType === "pdf") {
    return (
      <>
        <div className="relative">
          <Button
            variant="flat"
            color="secondary"
            startContent={<HiDocument className="w-7 h-7" />}
            as={Link}
            href={value}
            showAnchorIcon
            target="_blank"
            className="w-full justify-start"
          >
            {trimStringWithEllipsis(value, 45)}
          </Button>
          <Tooltip
            placement="top"
            showArrow
            content="Remove file"
            closeDelay={100}
          >
            <Button
              isIconOnly
              color="danger"
              size="sm"
              aria-label="Remove"
              className="rounded-full absolute right-0 -m-2 z-50 hover:bg-danger-500/90 shadow-sm"
              onClick={() => {
                onChange("");
              }}
            >
              <HiX />
            </Button>
          </Tooltip>
        </div>
      </>
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
