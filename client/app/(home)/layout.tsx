import React from "react";
import Container from "@/ui/Container";
import ClientOnly from "@/ui/ClientOnly";
import Navbar from "@/components/navbar/Navbar";

import ToasterProvider from "@/providers/ToasterProvider";
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
        <ClientOnly>
          {/* <Modal isOpen title="Entrar" showTitle description="Entre com seus detalhes aieeeeeeeeeeeeeeeeeeeeee"/> */}
          <Navbar />
        </ClientOnly>
        {children}
      </Container>
    </>
  );
};

export default HomeLayout;
