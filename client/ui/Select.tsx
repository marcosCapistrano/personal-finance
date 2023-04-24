"use client";

import React, { useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface SelectProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  options: Array<{value: string, label: string}>
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  options,
}) => {
  return (
    <div className="w-full relative">
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
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
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      >{options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}</select>
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-6
          scale-75
          top-5
          left-0
          z-10
          pt-1
          pointer-events-none
          origin-[0]
          select-none
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}>
        {label}
      </label>
    </div>
  );
};

export default Select;
