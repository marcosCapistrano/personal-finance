import React from 'react'
import styles from './FlexWrapper.module.css'

export default function FlexWrapper({children}) {
  return (
    <div className={styles.wrapper}>
        {children}
    </div>
  )
}
