import React from "react";
import Transaction from "./Transaction";
import styles from "./Transactions.module.css";

export default function Transactions({transactions}) {
  return (
    <div className={styles.transactions}>
      {transactions.length > 0 && transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
