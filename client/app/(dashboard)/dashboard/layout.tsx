import Container from "@/components/Container";
import PrimaryNavbar from "@/components/navbar/PrimaryNavbar";
import Sidenav from "@/components/navbar/Sidenav";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    // <Container>
    <>
      {/* <PrimaryNavbar></PrimaryNavbar> */}
      <div className="flex">
        <Sidenav
          topElement={
            <Image src="/images/sidebar/avatar.png" alt="logo" width={88} height={88} />
          }
        />
        <div className="flex-1 px-4 my-6">{children}</div>
        {/* <Sidenav
          topElement={
            <Image
              src="/images/avatar.png"
              alt="avatar image"
              width={40}
              height={40}
            />
          } */}
        {/* /> */}
      </div>
    </>
  );
}
