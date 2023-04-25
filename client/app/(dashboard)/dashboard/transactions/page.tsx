import React from "react";
import ModalButton from "@/components/modals/ModalButton";

import { store } from "@/stores";
import { setStartupTransactions } from "@/stores/searchSlice";
import DropdownButton from "@/ui/DropdownButton";
import TransactionsProvider from "@/components/transactions/TransactionsProvider";
import { getTransactions } from "@/lib/transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TypeFilter from "@/components/transactions/TypeFilter";
import Table from "@/components/transactions/Table";
import DateFilter from "@/components/transactions/DateFilter";

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions);
  const data = await getTransactions(session);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl">Transactions</h1>
        <ModalButton modalName="add_transaction" />
      </div>
      <div>
        <TransactionsProvider transactions={data}>
          <div className="flex mt-8 items-center justify-between">
            <TypeFilter />
            <DateFilter />
          </div>

          <div className="flex gap-8 mt-8">
            <div className="bg-white w-2/3 h-56 shadow-md"></div>
            <div className="bg-white w-1/3 h-56 shadow-md"></div>
          </div>
          <Table/>
        </TransactionsProvider>
      </div>
    </>
  );
};

export default TransactionsPage;
