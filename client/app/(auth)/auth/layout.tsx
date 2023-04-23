import React from "react";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
};

export default AuthLayout;
