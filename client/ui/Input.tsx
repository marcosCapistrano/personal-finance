"use client";

import React, { useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
          text-neutral-700
          absolute
          top-5
          left-2
          "
        />
      )}

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        peer
        rounded-sm px-2 pt-4 
        leading-none 
        h-10 
        focus:shadow-md 
        shadow-slate-400 
        shadow-inner 
        w-full
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-2"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute
          top-5
          text-md
          duration-150
          transform
          -translate-y-6
          scale-75
          z-10
          pt-1
          pointer-events-none
          origin-[0]
          ${formatPrice ? "left-9" : "left-2"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:-translate-y-4
          peer-placeholder-shown:pt-1
          peer-focus:scale-75
          peer-focus:-translate-y-6
          select-none
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
