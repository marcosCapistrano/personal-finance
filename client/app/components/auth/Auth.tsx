"use client";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
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
        <LoginForm />
      </Tabs.Content>
      <Tabs.Content
        className="bg-white p-4 flex-grow rounded-bl-md rounded-br-md outline-none"
        value="tab2"
      >
        <p className="mt-0 mb-5 leading-normal text-gray-500 text-center">
          Please enter your name, email and password.
        </p>
        <RegisterForm />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Auth;
