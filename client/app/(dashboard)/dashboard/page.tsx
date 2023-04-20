'use client'
import Button from "@/components/Button";
import React from "react";
import useModal from "@/hooks/useModal";

const DashboardPage = async () => {
  const modal = useModal();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl">Dashboard</h1>
        <Button label="+" onClick={modal.onOpen} />
      </div>
    </>
  );
};

export default DashboardPage;
