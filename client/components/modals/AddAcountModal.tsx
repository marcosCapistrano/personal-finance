"use client"

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from 'axios';


import Modal from "../../ui/Modal";
import useModal from "@/hooks/useModal";
import Select from "../../ui/Select";
import { getSession } from "next-auth/react";
import Input from "../../ui/Input";

const AddAcountModal = () => {
  const addAccountModal = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      institution_id: "",
      name: "",
      type: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/accounts", data)
      .then(() => {
        toast.success("Account Created!");
        addAccountModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      title="Add New Account"
      showTitle={true}
      description="Enter the information below to add a new account"
      actionLabel="Add"
      onSubmit={handleSubmit(onSubmit)}
      onClose={addAccountModal.onClose}
      disabled={false}
      isOpen={addAccountModal.isOpen}
    >
      <form>
      <div className="flex flex-col gap-4 mb-8">
        <Select
          id="institution_id"
          label="Institution"
          disabled={isLoading}
          register={register}
          errors={errors}
          options={[{label: "Picpay", value: "c08d2ad7-f71c-45dc-801c-006c3ab6931e"}]}
          required
        />

        <Input
          id="name"
          label="Account Name"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="type"
          label="Account Type"
          type="text"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      </form>
    </Modal>
  );
};

export default AddAcountModal;
