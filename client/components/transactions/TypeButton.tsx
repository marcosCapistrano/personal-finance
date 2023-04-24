"use client";
import React, { useState } from "react";
import DropdownButton from "@/ui/DropdownButton";

const TypeButton = () => {
  return (
    <DropdownButton states={["All", "Incomes", "Expenses"]} onChangeState={() => {}}></DropdownButton>
  );
};

export default TypeButton;
