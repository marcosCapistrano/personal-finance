import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import axios from "axios";
import Button from "../Button";
import Label from "../forms/Label";
import Input from "../forms/Input";
import { toast } from "react-hot-toast";

const LoginForm = () => {
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
      .post("/loading", data)
      .then(() => {
        toast.loading("loading")
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false);
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

      <Button label="Login" onClick={handleSubmit(onSubmit)}/>
    </form>
  );
};

export default LoginForm;
