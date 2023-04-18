import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

const page = async () => {
  return (
      <div>page</div>
  );
};

export default page;
