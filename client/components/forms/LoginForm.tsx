"use client";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import axios from "axios";
import Button from "@/ui/Button";
import Label from "@/ui/Label";
import Input from "@/ui/Input";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
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
    const loadingToast = toast.loading("Loading...")

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.replace("/dashboard")
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    }).finally(() => {
      toast.dismiss(loadingToast)
    });
  };

  return (
    <form>
      <div className="mb-4 w-full flex flex-col justify-start">
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="mb-4 w-full flex flex-col justify-start">
        <Input
          id="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>

      <Button label="Login" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};

export default LoginForm;
