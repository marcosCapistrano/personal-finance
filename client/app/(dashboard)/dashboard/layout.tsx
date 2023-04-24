import Sidenav from "@/components/navbar/Sidenav";
import AddAcountModal from "@/components/modals/AddAcountModal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

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
      <AddAcountModal/>
      <Sidenav />
      <div className="ml-72 p-4">{children}</div>
    </>
  );
}
