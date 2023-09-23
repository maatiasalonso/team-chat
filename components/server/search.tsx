"use client";

import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import {
  Divider,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}
export const ServerSearch = ({ data }: ServerSearchProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const filteredData = data.map(({ label, type, data }) => {
    if (!data) return { label, type, data };

    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    return { label, type, data: filteredItems };
  });

  const onPress = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    onClose();

    if (type === "member")
      return router.push(`/servers/${params.serverId}/conversations/${id}`);

    if (type === "channel")
      return router.push(`/servers/${params.serverId}/channels/${id}`);
  };

  return (
    <>
      <Button
        variant="light"
        startContent={<HiSearch className="w-5 h-5" />}
        endContent={
          <>
            <Kbd keys={["command"]} className="ml-auto">
              K
            </Kbd>
          </>
        }
        className="w-full justify-start mt-2 font-semibold"
        onPress={onOpen}
      >
        Search...
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton
        size="xl"
        className={!data.length ? "pb-0" : "pb-3"}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <Input
                    isClearable
                    variant="bordered"
                    radius="lg"
                    placeholder="Search all channels and members"
                    startContent={
                      <HiSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 w-4 h-4" />
                    }
                    value={value}
                    onValueChange={setValue}
                  />
                  <Kbd className="h-6 font-semibold text-xs">ESC</Kbd>
                </div>
              </ModalHeader>
              <Divider className={!data.length ? "mb-16" : "mb-2"} />
              {!filteredData.length && (
                <ModalBody>
                  <p className="text-center pb-16">No search results found</p>
                </ModalBody>
              )}
              {filteredData.length && (
                <ModalBody>
                  {filteredData.map(({ label, type, data }) => {
                    if (!data?.length) return null;

                    return (
                      <div key={label}>
                        <Listbox aria-label="Search Actions">
                          <ListboxSection title={label} items={data}>
                            {data.map(({ id, icon, name }) => (
                              <ListboxItem
                                key={id}
                                startContent={icon}
                                onPress={() => onPress({ id, type })}
                              >
                                {name}
                              </ListboxItem>
                            ))}
                          </ListboxSection>
                        </Listbox>
                      </div>
                    );
                  })}
                </ModalBody>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
