import React, { InputHTMLAttributes, useState } from "react";
import { FieldValues, ValidationMode, useForm } from "react-hook-form";

interface FormProps {
    onSubmit: () => void;
    children: React.ReactElement;
    mode?: keyof ValidationMode | undefined;
    reValidateMode?: "onBlur" | "onChange" | "onSubmit" | undefined;
    defaultValues?: FieldValues | Promise<FieldValues>;
}

const Form: React.FC<FormProps> = ({
    onSubmit,
    children,
    mode,
    reValidateMode,
    defaultValues,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode,
        reValidateMode,
        defaultValues,
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {React.cloneElement(children, {register, disabled: isLoading, errors})}
        </form>
    );
}

export default Form;