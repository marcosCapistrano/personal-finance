import React from "react";
import styles from './Transaction.module.css';

export default function Transaction({transaction}) {
    const {date, description, value} = transaction
  return (
    <div className={styles.transaction}>
      <span className={styles.date}>{date.toDateString('pt-br')}</span>
      <span className={styles.description}>{description}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
