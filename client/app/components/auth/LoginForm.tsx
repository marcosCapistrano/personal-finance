import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

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
      .post("/login", data)
      .then(() => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
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
        <label className="text-xs leading-none mb-2 block" htmlFor="password">
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
  );
};

export default LoginForm;
