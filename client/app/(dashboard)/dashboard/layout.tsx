import Sidenav from "@/components/navbar/Sidenav"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth') 
  }

  return (
    <Sidenav>
        
    </Sidenav>
  )
}