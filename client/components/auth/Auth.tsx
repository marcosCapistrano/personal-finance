"use client";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import Button from "../../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";
import Card from "@/ui/Card";
import { HTMLProps } from "react";

interface AuthProps {
    className?: HTMLProps<HTMLElement>["className"] 
}

const Auth:React.FC<AuthProps> = ({className}) => {

  return (
    <Tabs.Root
      className="flex flex-col shadow-lg max-w-xl mx-auto"
      defaultValue="tab1"
    >
      <Tabs.List
        className="flex-shrink-0 flex border-b border-solid "
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="text-black bg-white px-0 py-5 h-11 flex-1 flex items-center justify-center text-base data-[state=active]:shadow-[0_1px_0_0_#705ade] data-[state=active]:text-color2 duration-150 transition select-none rounded-tl-md"
          value="tab1"
        >
          Login
        </Tabs.Trigger>
        <Tabs.Trigger
          className="text-black bg-white px-0 py-5 h-11 flex-1 flex items-center justify-center text-base data-[state=active]:shadow-[0_1px_0_0_#705ade] data-[state=active]:text-color2 duration-150 transition select-none rounded-tr-md"
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
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
            />
          <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => {}}
            />
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="bg-white p-4 flex-grow rounded-bl-md rounded-br-md outline-none"
        value="tab2"
      >
        <p className="mt-0 mb-5 leading-normal text-gray-500 text-center">
          Please enter your name, email and password.
        </p>
        <RegisterForm />
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
            />
          <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => {}}
            />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Auth;
