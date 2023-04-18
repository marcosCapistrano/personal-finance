import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import Navbar from "@/app/components/navbar/Navbar";
import classnames from 'classnames';
import {Poppins} from 'next/font/google'
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Poppins({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '500', '600', '700', '800', '900']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classnames("bg-slate-100", font.className)}>
        <Container>
          <ClientOnly>
            <Modal isOpen title="Entrar" showTitle description="Entre com seus detalhes aieeeeeeeeeeeeeeeeeeeeee"/>
            <Navbar />
          </ClientOnly>
          {children}
        </Container>
      </body>
    </html>
  );
}
