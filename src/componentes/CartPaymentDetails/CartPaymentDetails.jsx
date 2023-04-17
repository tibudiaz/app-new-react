import React from 'react'
import { Button } from 'react-bootstrap'
import styles from "./CartPaymentDetails.module.css"
export const CartPaymentDetails = ({total, onClick}) => {
  return (
    <div className={styles.paymentDetails}>
        <span className={styles.total}>Total a pagar: ${total}</span>
        <Button onClick={onClick} className={styles.continueButton}>Continuar</Button>
    </div>
  )
}
