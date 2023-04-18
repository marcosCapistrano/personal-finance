import React from "react";
import Container from "@/components/Container";
import ClientOnly from "@/components/ClientOnly";
import Modal from "@/components/modals/Modal";
import Navbar from "@/components/navbar/Navbar";

import ToasterProvider from "@/providers/ToasterProvider";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container>
        <ClientOnly>
          <ToasterProvider />
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
