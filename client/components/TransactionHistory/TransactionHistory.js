'use client'
import React, {useState} from "react";
import styles from "./TransactionHistory.module.css";
import Transaction from "./Transaction";

export default function TransactionHistory({ data: initialData }) {
  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const temp = [...data];
    temp.push({id: Math.random(), date: new Date()});
    setData(temp)
  }

  return (
    <div className="section container">
      <span className="section-title">Histórico</span>
      <div className={styles.transactions}>
        {data.map((transaction) => {
         console.log(transaction);
          return (
          <Transaction key={transaction.id} transaction={transaction}/>
        )})}
        <button onClick={() => handleAdd()}>Ad</button>
      </div>
    </div>
  );
}
