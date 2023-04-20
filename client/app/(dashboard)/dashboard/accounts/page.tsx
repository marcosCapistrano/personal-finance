import React from "react";
import Image from "next/image";

const institutions = [
  {
    id: 0,
    name: "Nubank",
    logo: "/images/institutions/nubank.png",
    accounts: [
      {
        id: 0,
        name: "Nuconta",
        type: "DEBIT",
        balance: 323.0,
      },
      {
        id: 1,
        name: "Crédito",
        type: "CREDIT",
        balance: 323.0,
      },
    ],
  },
  {
    id: 1,
    name: "Picpay",
    logo: "/images/institutions/picpay.png",
    accounts: [
      {
        id: 0,
        name: "Débito",
        type: "DEBIT",
        balance: 0.0,
      },
      {
        id: 1,
        name: "Crédito",
        type: "CREDIT",
        balance: 200.0,
      },
    ],
  },
  {
    id: 2,
    name: "Inter",
    logo: "/images/institutions/inter.png",
    accounts: [
      {
        id: 0,
        name: "Débito",
        type: "DEBIT",
        balance: 123.0,
      },
      {
        id: 1,
        name: "Crédito",
        type: "CREDIT",
        balance: 353.0,
      },
    ],
  },
  {
    id: 3,
    name: "C6",
    logo: "/images/institutions/c6.png",
    accounts: [
      {
        id: 0,
        name: "Débito",
        type: "DEBIT",
        balance: 1323.0,
      },
    ],
  },
];

const AccountsPage = () => {
  return (
    <>
      <h1 className="text-5xl">Accounts</h1>
      <div className="flex flex-col mt-12 gap-16">
        {institutions.map((institution) => (
          <div key={institution.id} className="flex flex-col gap-8">
            <div className="flex gap-4 items-center">
              <Image
                alt="institution logo"
                src={institution.logo}
                width={48}
                height={48}
                className="rounded-full"
              />
              <h2 className="text-3xl">{institution.name}</h2>
            </div>
            <div className="flex gap-8">
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
                    <span>R$ {account.balance}</span>
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
