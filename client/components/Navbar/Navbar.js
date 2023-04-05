import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <div className={styles.container}>
        <Image src="/images/logo.png" width={174} height={32} alt="logo" />
        <ul className={styles.navLinks}>
          <li>Sobre</li>
          <li>Contato</li>
          <li className={styles.featured}>Signup</li>
        </ul>
      </div>
    </div>
  );
}
