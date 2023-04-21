import React from "react";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import Button from "@/ui/Button";
import { AccountsResponse, getAccounts } from "@/lib/accounts";
import ModalButton from "./ModalButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


const AccountsPage = async () => {
  const session = await getServerSession(authOptions);
  const institutions = (await getAccounts(session)).data;
  console.log(institutions)

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl">Accounts</h1>
        <ModalButton />
      </div>
      <div className="flex flex-col mt-12 gap-16">
        {institutions && institutions.map((institution) => (
          <div key={institution.institution_id} className="flex flex-col gap-8">
            <div className="flex gap-4 items-center flex-wrap">
              <Image
                alt="institution logo"
                src={institution.logo}
                width={48}
                height={48}
                className="rounded-full"
              />
              <h2 className="text-3xl">{institution.name}</h2>
            </div>
            <div className="flex gap-8 flex-wrap">
              {institution.accounts.map((account) => (
                <div
                  key={account.id}
                  className="w-96 bg-white rounded-md flex flex-col gap-8 p-4 justify-between shadow-md transition duration-300 hover:shadow-xl"
                >
                  <h3 className="text-2xl">{account.name}</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {account.type === "DEBIT"
                        ? "Current Balance"
                        : "Open Invoice "}
                    </span>
                    <span>R$ 0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountsPage;
