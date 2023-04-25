import React from "react";
import Container from "@/ui/Container";
import Navbar from "@/components/navbar/Navbar";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Container>
        <Navbar />
        {children}
      </Container>
    </>
  );
};

export default HomeLayout;
