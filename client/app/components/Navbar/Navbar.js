import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div className={styles.container}>
        <Image src="/images/logo.png" width={174} height={32} alt="logo" />
        <ul className={styles.navLinks}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">Sobre</Link>
          </li>
          <li>
            <Link href="/contact">Contato</Link>
          </li>
          <li>
            <Link className={styles.featured} href="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
