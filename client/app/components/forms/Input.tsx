'use client'

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  ['aria-describedby']?: string,
  ['aria-invalid']?: string,
  ['data-invalid']?: string,
  ['data-valid']?: string,
  id: string,
  name: string,
  onChange: () => void;
  onInvalid: () => void;
  title: string;
  type: string;
}

const Input: React.FC<InputProps> = ({
  ['data-valid']: string
}) => {
  console.log(string)
  return (
        <input
          className="flex-[1_0_auto] rounded-sm px-2 py-1 leading-none h-8 focus:shadow-md shadow-slate-400 shadow-inner w-full
          data-[valid]:border-red-800"
          id="name"
          type="text"
        />
  )
}

export default Input