import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

//@ts-nocheck
export const getInstitutions = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    throw new Error("authenticate first");
  }

  console.log("FOUND SESSION")

  const res = await fetch("http://localhost:8080/api/institutions", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`failed: ${res.statusText}`);
  }

  return res.json();
};
