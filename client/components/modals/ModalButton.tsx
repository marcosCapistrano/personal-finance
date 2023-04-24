"use client";
import React from "react";
import useModal, {ModalName} from "@/hooks/useModal";
import Button from "@/ui/Button";

interface ModalButtonProps {
  modalName: ModalName;
}

const ModalButton:React.FC<ModalButtonProps> = ({modalName}) => {
  const modal = useModal();
  return <Button label="+" onClick={() => modal.onOpen(modalName)} small />;
};

export default ModalButton;
