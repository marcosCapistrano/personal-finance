import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";

interface RouteGuardProps {
    children: React.ReactNode
}

async function getSession() {
  const session = await getServerSession(authOptions);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  return session;
}

const RouteGuard = async ({children}: RouteGuardProps) => {
  const router = useRouter();
  const session = await getSession();

  if (!session) {
    router.push("/auth")
  }

  return <div>{children}</div>;
};

export default RouteGuard;
