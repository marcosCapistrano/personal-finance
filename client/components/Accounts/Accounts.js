import React from "react";
import styles from "./Accounts.module.css";

export default function Accounts({accounts = null}) {
  return (
    <section className="section">
      <div className={styles.accounts}>
        {accounts && accounts.map((account) => (
          <div key={account.id} className={styles.account}>
            <span>{account.name}</span>
            <span>R$ {account.balance}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
