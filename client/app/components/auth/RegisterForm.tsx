import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import axios from "axios";
import Button from "../Button";
import Label from "../forms/Label";
import Input from "../forms/Input";

const RegisterForm = () => {
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
    <Form.Root  className="flex flex-col gap-3">
      <Form.Field name="name">
        <Form.Label asChild> 
          <Label label="Name" />
        </Form.Label>
        <Form.Control asChild>
          <Input />
        </Form.Control>
      </Form.Field>

      <Form.Field name="email">
        <Form.Label asChild> 
          <Label label="Email" />
        </Form.Label>
        <Form.Control asChild required>
          <Input />
        </Form.Control>
      </Form.Field>

      <Form.Field name="password">
        <Form.Label asChild> 
          <Label label="Password" />
        </Form.Label>
        <Form.Control asChild type="password">
          <Input />
        </Form.Control>
      </Form.Field>

      {/* <Form.Message>eae tiozao</Form.Message> */}
      {/* <Form.ValidityState /> */}

      <Form.Submit asChild >
        <Button label="Register"/>
      </Form.Submit>
    </Form.Root>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <fieldset className="mb-4 w-full flex flex-col justify-start">
    //   </fieldset>
    //   <fieldset className="mb-4 w-full flex flex-col justify-start">
    //     <label className="text-xs leading-none mb-2 block" htmlFor="email">
    //       Email
    //     </label>
    //     <input
    //       className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner"
    //       id="email"
    //       type="email"
    //     />
    //   </fieldset>
    //   <fieldset className="mb-4 w-full flex flex-col justify-start">
    //     <label
    //       className="text-xs leading-none mb-2 block"
    //       htmlFor="password"
    //     >
    //       Password
    //     </label>
    //     <input
    //       className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner"
    //       id="password"
    //       type="password"
    //     />
    //   </fieldset>
    //   <div
    //     style={{
    //       display: "flex",
    //       marginTop: 20,
    //       justifyContent: "flex-end",
    //     }}
    //   >
    //     <button
    //       type="submit"
    //       className="mx-auto w-36 bg-[#fc4c69] p-4 text-white font-semibold rounded-md"
    //     >
    //       Register
    //     </button>
    //   </div>
    // </form>
  );
};

export default RegisterForm;
