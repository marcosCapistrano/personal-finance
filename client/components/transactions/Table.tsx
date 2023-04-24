"use client";
import React, { useContext } from "react";
import { TransactionsContext } from "./TransactionsProvider";

const Table = () => {
  const transactions = useContext(TransactionsContext);

  console.log(transactions);

  return (
    <table
      className="
    bg-white 
       p-4 
       border-collapse 
       w-full 
    [&>tr:nth-child(2n)]:bg-slate-200
    [&>tr>th]:text-left
    [&>tr]:p-4"
    >
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Category</th>
        <th>Account</th>
        <th>Amount</th>
        <th>Actions</th>
      </tr>

      {transactions &&
        transactions.map((d, i) => {
          if (d && d.visible)
            return (
              <tr key={i}>
                <td data-cell="date">
                  {new Date(d.date).toLocaleDateString("pt-br", {
                    dateStyle: "short",
                  })}
                </td>
                <td data-cell="description">{d.description}</td>
                <td data-cell="category">{d.type}</td>
                <td data-cell="account">{d.account_id}</td>
                <td data-cell="amount">{d.value}</td>
                <td data-cell="actions">none</td>
              </tr>
            );
        })}
    </table>
  );
};

export default Table;
