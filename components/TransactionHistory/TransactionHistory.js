"use client";
import React, { useEffect, useState } from "react";
import styles from "./TransactionHistory.module.css";
import Transactions from "./Transactions";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: new Date(),
      description: "fatura nubank",
      value: 123.5,
    },
  ]);

  return (
    <div className="section container">
      <span className="section-title">Histórico</span>
      <Transactions transactions={transactions} />
      <div className={styles.btnContainer}>
        <button>Add</button>
      </div>
    </div>
  );
}
