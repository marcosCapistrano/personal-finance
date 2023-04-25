"use client";
import React, { useContext, useEffect, useState } from "react";
import DropdownButton from "@/ui/DropdownButton";
import { TransactionsDispatchContext } from "./TransactionsProvider";

const TypeButton = () => {
  const dispatch = useContext(TransactionsDispatchContext);
  const states = ["ALL", "INCOME", "EXPENSE"];
  const [selected, setSelected] = useState(states[0])

  useEffect(() => {
    dispatch({
      type: "filter_type",
      filter: selected,
    })
  }, [selected])

  return (
    <DropdownButton states={states} onChangeState={setSelected}></DropdownButton>
  );
};

export default TypeButton;
