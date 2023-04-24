//@ts-nocheck
export const getInstitutions = async (session): Promise<AccountsResponse> => {
  if (!session || !session.user) {
    throw new Error("authenticate first");
  }

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
