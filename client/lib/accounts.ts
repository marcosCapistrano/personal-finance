import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export type AccountsResponse = [
  {
    institution_id: string;
    logo: string;
    name: string;
    accounts: [
      {
        id: string;
        name: string;
        type: string;
      }
    ];
  }
];

export const getAccounts = async (session): Promise<AccountsResponse> => {
  if (!session || !session.user) {
    throw new Error("authenticate first");
  }

  const res = await fetch("http://localhost:8080/api/accounts", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  console.log(res.ok);

  if (!res.ok) {
    throw new Error(`failed: ${res.statusText}`);
  }

  return res.json();
};
