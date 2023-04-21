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
      {/* <div className="absolute z-2 top-0 left-0 bg-fixed bg-contain w-screen h-screen bg-[url('/images/dinheiros.png')] overflow-hidden"></div>
      <div className="absolute z-2 h-screen w-screen bg-gradient-to-b from-[#fff] via-color5 to-color2 overflow-hidden"></div> */}
    </>
  );
};

export default HomeLayout;
