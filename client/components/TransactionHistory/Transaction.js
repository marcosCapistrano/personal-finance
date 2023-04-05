"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./Transaction.module.css";

export default function Transaction({ transaction, onCreate }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const { date, type, value, description, account_id } = transaction;
  const [isEditing, setIsEditing] = useState(!transaction.account_id);
  const [newTransaction, setNewTransaction] = useState({ ...transaction });

  console.log(isEditing);

  const handleCreate = async () => {
    setIsFetching(true);
    const res = await fetch("http://127.0.0.1:8080/transactions", {
      method: "POST",
      body: JSON.stringify({
        date: new Date(newTransaction.date).toISOString(),
        type: newTransaction.type,
        description: newTransaction.description,
        account_id: newTransaction.account_id,
        value: Number(newTransaction.value),
      }),
    });
    setIsFetching(false);
    setIsEditing(false);

    if (!res.ok) {
      throw new Error("Failed to update transactions");
    }

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  if (isEditing) {
    return (
      <div className={styles.transaction}>
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, date: e.target.value })
          }
        ></input>

        <select
          value={newTransaction.type}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, type: e.target.value })
          }
        >
          <option value="INCOME">INCOME</option>
          <option value="OUTGOING">OUTGOING</option>
        </select>

        <input
          type="text"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              description: e.target.value,
            })
          }
        ></input>

        <input
          type="text"
          value={newTransaction.account_id}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, account_id: e.target.value })
          }
        ></input>

        <input
          type="number"
          value={newTransaction.value}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, value: e.target.value })
          }
        ></input>

        <button onClick={() => handleCreate()}>OK</button>
      </div>
    );
  }

  return (
    <div className={styles.transaction}>
      <span className={styles.date}>
        {new Date(date).toDateString("pt-br")}
      </span>
      <span className={styles.type}>{newTransaction.type}</span>
      <span className={styles.description}>{newTransaction.description}</span>
      <span className={styles.accountID}>{newTransaction.account_id}</span>
      <span className={styles.value}>{newTransaction.value}</span>
      <button onClick={() => setIsEditing(true)}>EDIT</button>
    </div>
  );
}
