"use client";

import React, { useState } from "react";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  User,
} from "@nextui-org/react";
import {
  HiCheck,
  HiChevronRight,
  HiDotsVertical,
  HiShieldCheck,
  HiShieldExclamation,
} from "react-icons/hi";
import { LuShield, LuShieldQuestion } from "react-icons/lu";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <HiShieldCheck className="w-4 h-4 text-indigo-500" />,
  ADMIN: <HiShieldExclamation className="w-4 h-4 text-danger" />,
};

export const ManageMembersModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const [loadingId, setLoadingId] = useState("");
  const [roleSelected, setRoleSelected] = useState(false);
  const isModalOpen = isOpen && type === "members";

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const response = await fetch(`/api/members/${server.id}/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      router.refresh();
      onOpen("members", { server: await response.json() });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const response = await fetch(`/api/members/${server.id}/${memberId}`, {
        method: "DELETE",
      });

      router.refresh();
      onOpen("members", { server: await response.json() });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl mt-4">Manage Members</h1>
                <p className="text-sm text-zinc-400 mt-2">
                  {server?.members?.length} Members
                </p>
              </ModalHeader>
              <ModalBody className="pb-6">
                {server?.members?.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <User
                      name={member.profile.name}
                      description={member.profile.email}
                      avatarProps={{
                        src: `${member.profile.imageUrl}`,
                      }}
                      className="gap-4"
                    />
                    <Tooltip
                      placement="top"
                      showArrow
                      content={member.role}
                      closeDelay={100}
                    >
                      <div className="mb-4">{roleIconMap[member.role]}</div>
                    </Tooltip>
                    {server.profileId !== member.profileId && (
                      <div className="ml-auto">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              variant="light"
                              isLoading={loadingId === member.id}
                            >
                              {loadingId !== member.id && (
                                <HiDotsVertical className="w-4 h-4 text-zinc-500" />
                              )}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Manage Members Actions"
                            closeOnSelect={!roleSelected}
                          >
                            <DropdownItem
                              key="role"
                              startContent={
                                <LuShieldQuestion className="w-4 h-4 " />
                              }
                              endContent={
                                <HiChevronRight className="w-4 h-4" />
                              }
                              showDivider
                              onMouseEnter={() => setRoleSelected(true)}
                              onMouseLeave={() => setRoleSelected(false)}
                            >
                              <Dropdown placement="left">
                                <DropdownTrigger>Role</DropdownTrigger>
                                <DropdownMenu aria-label="Manage Role Action">
                                  <DropdownItem
                                    key="role"
                                    startContent={
                                      <LuShield className="w-4 h-4 dark:fill-zinc-100 fill-zinc-800" />
                                    }
                                    endContent={
                                      member.role === "GUEST" && (
                                        <HiCheck className="w-4 h-4" />
                                      )
                                    }
                                    onPress={() => {
                                      onRoleChange(member.id, "GUEST");
                                    }}
                                  >
                                    Guest
                                  </DropdownItem>
                                  <DropdownItem
                                    key="role"
                                    startContent={
                                      <HiShieldCheck className="w-4 h-4" />
                                    }
                                    endContent={
                                      member.role === "MODERATOR" && (
                                        <HiCheck className="w-4 h-4" />
                                      )
                                    }
                                    onPress={() => {
                                      onRoleChange(member.id, "MODERATOR");
                                    }}
                                  >
                                    Moderator
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </DropdownItem>
                            <DropdownItem
                              key="kick-out"
                              className="text-danger"
                              color="danger"
                              onPress={() => onKick(member.id)}
                            >
                              Kick {member.profile.name}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
