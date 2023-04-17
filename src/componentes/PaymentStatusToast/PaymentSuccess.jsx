import { useState } from 'react';
import { Toast } from 'react-bootstrap';

export const PaymentSuccess = ({paymentId}) => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={5000}
      autohide
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        right: '50%',
        transform: 'translate(-50%, 0)',
        minWidth: '250px',
      }}
    >
      <Toast.Header>
        <strong className="me-auto">Pago exitoso</strong>
      </Toast.Header>
      <Toast.Body>¡Tu pago se ha realizado con éxito! ID de la operación: {paymentId}</Toast.Body>
    </Toast>
  );
};