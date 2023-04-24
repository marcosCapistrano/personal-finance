"use client";
import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownButtonProps {
  states: string[];
  onChangeState: (state: string) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  states: initialStates,
  onChangeState
}) => {
  const [states, setStates] = useState(initialStates);

  const setSelected = (index: number) => {
    const temp = states[0];
    const newArr = states.map((state, i) => {
      if(i == 0)
        return states[index];

      else if(i == index)
        return temp

      return state
    })

    console.log(newArr);
    setStates(newArr);
    onChangeState(newArr[0]);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="
          bg-green-700
          py-2
          px-8
          w-32
          text-white
        "
        >
          {states[0]}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="
         w-32 
          bg-white
          rounded-md
          py-2
          px-8
        "
        >
          {states.map((state, i) => i > 0 && (
            <DropdownMenu.Item key={i} className="text-center cursor-pointer my-4" onClick={() => setSelected(i)}>
              {state}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownButton;
