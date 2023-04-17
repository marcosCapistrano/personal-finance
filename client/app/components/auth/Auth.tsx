"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/register", data)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Tabs.Root
      className="flex flex-col max-w-xl mx-auto mt-32 shadow-lg"
      defaultValue="tab1"
    >
      <Tabs.List
        className="flex-shrink-0 flex border-b border-solid "
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="text-black bg-white px-0 py-5 h-11 flex-1 flex items-center justify-center text-base data-[state=active]:shadow-[0_1px_0_0_#fc4c69] data-[state=active]:text-[#fc4c69] select-none rounded-tl-md"
          value="tab1"
        >
          Login
        </Tabs.Trigger>
        <Tabs.Trigger
          className="text-black bg-white px-0 py-5 h-11 flex-1 flex items-center justify-center text-base data-[state=active]:shadow-[0_1px_0_0_#fc4c69] data-[state=active]:text-[#fc4c69] select-none rounded-tr-md"
          value="tab2"
        >
          Register
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="bg-white p-4 flex-grow rounded-bl-md rounded-br-md outline-none"
        value="tab1"
      >
        <p className="mt-0 mb-5 leading-normal text-gray-500 text-center">
          Please enter your email and password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
            <label className="text-xs leading-none mb-2 block" htmlFor="email">
              Email
            </label>
            <input
              className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner "
              id="email"
              type="email"
            />
          </fieldset>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
            <label
              className="text-xs leading-none mb-2 block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner "
              id="password"
              type="password"
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              className="mx-auto w-36 bg-[#fc4c69] p-4 text-white font-semibold rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </Tabs.Content>
      <Tabs.Content
        className="bg-white p-4 flex-grow rounded-bl-md rounded-br-md outline-none"
        value="tab2"
      >
        <p className="mt-0 mb-5 leading-normal text-gray-500 text-center">
          Please enter your name, email and password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
            <label className="text-xs leading-none mb-2 block" htmlFor="name">
              Name
            </label>
            <input
              className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner"
              id="name"
              type="text"
            />
          </fieldset>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
            <label className="text-xs leading-none mb-2 block" htmlFor="email">
              Email
            </label>
            <input
              className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner"
              id="email"
              type="email"
            />
          </fieldset>
          <fieldset className="mb-4 w-full flex flex-col justify-start">
            <label
              className="text-xs leading-none mb-2 block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner"
              id="password"
              type="password"
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <button type="submit" className="mx-auto w-36 bg-[#fc4c69] p-4 text-white font-semibold rounded-md">
              Register
            </button>
          </div>
        </form>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Auth;
