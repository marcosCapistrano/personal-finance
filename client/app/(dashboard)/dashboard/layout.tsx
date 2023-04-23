import Sidenav from "@/components/navbar/Sidenav";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddAcountModal from "@/components/modals/AddAcountModal";
import ClientOnly from "@/ui/ClientOnly";

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
    <>
      <ClientOnly>
        <AddAcountModal />
      </ClientOnly>
      <Sidenav />
      <div className="ml-72 p-4">{children}</div>
    </>
  );
}
