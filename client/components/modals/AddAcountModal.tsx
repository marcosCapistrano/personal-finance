//@ts-nocheck
"use client"

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from 'axios';
import useSWR from 'swr';

import Modal from "@/ui/Modal";
import useModal from "@/hooks/useModal";
import Select from "@/ui/Select";
import Input from "@/ui/Input";
import { useSession } from "next-auth/react";

const AddAcountModal = () => {
  const modal = useModal();
  const [data, setData] = useState(null)
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/institutions");

      setData(res.data)
    }
    fetchData();
  }, [])

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

  const rawOptions: Array<{ name: string, institution_id: string }> = data;
  console.log(rawOptions)
  if (!rawOptions)
    return null
  const options: Array<{ label: string, value: string }> = rawOptions.map(option => {
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
            disabled={isLoadingForm}
            register={register}
            errors={errors}
            options={options}
            required
          />

          <Input
            id="name"
            label="Account Name"
            type="text"
            disabled={isLoadingForm}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="type"
            label="Account Type"
            type="text"
            disabled={isLoadingForm}
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
