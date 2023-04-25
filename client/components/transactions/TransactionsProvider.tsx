"use client";
import { Transaction } from "@/types/transaction";
import React, { createContext, useReducer } from "react";

export const TransactionsContext = createContext<Transaction[]>([]);
export const TransactionsDispatchContext = createContext<React.Dispatch<
  () => void
> | null>(null);

const TransactionsProvider = ({
  children,
  transactions: initialTransactions,
}: {
  children: React.ReactNode;
  transactions: Transaction[];
}) => {
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    initialTransactions
  );

  return (
    <TransactionsContext.Provider value={transactions}>
      <TransactionsDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionsDispatchContext.Provider>
    </TransactionsContext.Provider>
  );
};

function transactionsReducer(transactions: Transaction[], action: () => void) {
  switch (action.type) {
    case "filter_type": {
      return transactions.map((t) => {
        if (action.filter === "ALL" || t.type === action.filter) {
          t.visible = true;
        } else {
          t.visible = false;
        }
          return t;
      });
    }
    case "added": {
      return [
        ...transactions,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return transactions.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return transactions.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default TransactionsProvider;
