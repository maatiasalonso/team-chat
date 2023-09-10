"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import FileUpload from "@/components/file-upload";

const CreateServerModal = () => {
  const { control, handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Modal defaultOpen>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl mt-4">Customize your server</h1>
                <p className="text-sm text-zinc-400 mt-2">
                  Give your server a personality with a name and an image. You
                  can always change it later.
                </p>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Controller
                    name="serverImage"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={(url) => {
                          field.onChange(url);
                        }}
                      />
                    )}
                  />{" "}
                  <Input
                    autoFocus
                    label="Server Name"
                    placeholder="Enter server name"
                    variant="bordered"
                    isRequired
                    labelPlacement="outside"
                    {...register("serverName")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    className="w-full sm:w-auto hover:bg-blue-500"
                  >
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateServerModal;
