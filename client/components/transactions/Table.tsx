"use client";
import React, { useContext } from "react";
import { TransactionsContext } from "./TransactionsProvider";

const Table = () => {
  const transactions = useContext(TransactionsContext);

  console.log(transactions);

  return (
    <table
      className="
      mt-8
      shadow-md
    bg-white 
       p-4 
       border-collapse 
       w-full 
    [&>tbody>tr:nth-child(2n)]:bg-slate-200
    [&>thead>tr>th]:text-left
    [&>tbody>tr>td]:p-4
    [&>thead>tr>th]:p-4"
    >
      <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Category</th>
        <th>Account</th>
        <th>Amount</th>
        <th>Actions</th>
      </tr>
</thead>

    <tbody>
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
</tbody>
    </table>
  );
};

export default Table;
