"use client";
import React, { useContext, useState } from "react";
import DropdownButton from "@/ui/DropdownButton";
import { TransactionsDispatchContext } from "./TransactionsProvider";

const TypeButton = () => {
  const dispatch = useContext(TransactionsDispatchContext);
  const states = ["ALL", "INCOME", "EXPENSE"];
  const [selected, setSelected] = useState(states[0])

  dispatch({
    type: "filter",
    filter: selected,
  })

  return (
    <DropdownButton states={states} onChangeState={setSelected}></DropdownButton>
  );
};

export default TypeButton;
