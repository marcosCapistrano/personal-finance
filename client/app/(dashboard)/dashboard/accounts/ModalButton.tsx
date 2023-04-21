"use client";
import React from "react";
import useModal from "@/hooks/useModal";
import Button from "@/ui/Button";

const ModalButton = () => {
  const modal = useModal();
  return <Button label="+" onClick={modal.onOpen} small />;
};

export default ModalButton;
