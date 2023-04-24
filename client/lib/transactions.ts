import { Transaction } from "@/types/transaction";

export const getTransactions = async (session): Promise<Transaction[]> => {
  if (!session || !session.user) {
    throw new Error("authenticate first");
  }

  const res = await fetch("http://localhost:8080/api/transactions", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error(`failed: ${res.statusText}`);
  }

  return res.json();
};
