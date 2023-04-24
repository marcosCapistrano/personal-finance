"use client"

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from 'axios';
import useSWR from 'swr';

import Modal from "../../ui/Modal";
import useModal from "@/hooks/useModal";
import Select from "../../ui/Select";
import Input from "../../ui/Input";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AddAcountModal = () => {
  const modal = useModal();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { data, error, isLoading } = useSWR(
    "/api/institutions",
    fetcher
  );

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
    setIsLoadingForm(true);

    axios
      .post("/api/accounts", data)
      .then(() => {
        toast.success("Account Created!");
        modal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingForm(false);
      });
  };

  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  const rawOptions: Array<{name: string, institution_id: string}> = data;
  console.log(rawOptions)
  const options: Array<{label: string, value: string}> = rawOptions.map(option => {
    return {
      label: option.name,
      value: option.institution_id
    }
  })

  return (
    <Modal
      title="Add New Account"
      showTitle={true}
      description="Enter the information below to add a new account"
      actionLabel="Add"
      onSubmit={handleSubmit(onSubmit)}
      onClose={modal.onClose}
      disabled={false}
      isOpen={modal.openedModal === "add_account"}
    >
      <form>
      <div className="flex flex-col gap-4 mb-8">
        <Select
          id="institution_id"
          label="Institution"
          disabled={isLoading}
          register={register}
          errors={errors}
          options={options}
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
