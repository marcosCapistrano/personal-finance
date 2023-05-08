//@ts-nocheck
"use client"

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from 'axios';

import Modal from "@/ui/Modal";
import useModal from "@/hooks/useModal";
import Select from "@/ui/Select";
import Input from "@/ui/Input";

function extractAccountInfo(data) {
  const result = [];
  for (const institution of data) {
    for (const account of institution.accounts) {
      result.push({ value: account.id, label: account.name });
    }
  }
  return result;
}

const AddTransactionModal = () => {
  const modal = useModal();
  const [data, setData] = useState(null)
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/accounts");

      setData(res.data)
    }
    fetchData();
  }, [])

  console.log(data)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      account_id: "",
      date: "",
      type: "",
      value: "",
      description: "",
    },
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoadingForm(true);

    axios
      .post("/api/transactions", data)
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

  const rawOptions: Array<{ accounts: Array<{ id: string, name: string, type: string }>, institution_id: string, logo: string, name: string }> = data;
  if (!rawOptions)
    return null

  const options: Array<{ label: string, value: string }> = extractAccountInfo(rawOptions)

  console.log(options)

  return (
    <Modal
      title="Add New Transaction"
      showTitle={true}
      description="Enter the information below to add a new transaction"
      actionLabel="Add"
      onSubmit={handleSubmit(onSubmit)}
      onClose={modal.onClose}
      disabled={false}
      isOpen={modal.openedModal === "add_transaction"}
    >
      <form>
        <div className="flex flex-col gap-4 mb-8">
          <Select
            id="account_id"
            label="Account"
            disabled={isLoadingForm}
            register={register}
            errors={errors}
            options={options}
            required
          />

          <Input
            id="date"
            label="Transaction Date"
            type="date"
            disabled={isLoadingForm}
            register={register}
            errors={errors}
            required
            valueAsDate
          />

          <Select
            id="type"
            label="Transaction Type"
            type="text"
            disabled={isLoadingForm}
            register={register}
            errors={errors}
            options={[{label: "Income", value: "INCOME"}, {label: "Expense", value: "EXPENSE"}]}
            required
          />

          <Input
            id="value"
            label="Amount"
            type="number"
            disabled={isLoadingForm}
            register={register}
            errors={errors}
            required
            valueAsNumber
          />

          <Input
            id="description"
            label="Description"
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

export default AddTransactionModal;
