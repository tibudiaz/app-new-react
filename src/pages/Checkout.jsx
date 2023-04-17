import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { PaymentSuccess } from "../componentes";
import { Ring } from "@uiball/loaders";
import { Navbar } from "../componentes/navBar";
import { getDoc } from "firebase/firestore";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentButton: {
    borderRadius: "12px",
    marginTop: "10px",
    fontSize: "1rem",
  },
};

export const Checkout = () => {
  const [loading, setLoading] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCompra = JSON.parse(localStorage.getItem("compra"));
    if (storedCompra) {
      setTotal(Number(storedCompra.total));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const cardNumber = e.target.cardNumber.value;
    const expirationDate = e.target.expirationDate.value;
    const cvc = e.target.cvc.value;

    console.log("Nombre en la tarjeta:", name);
    console.log("Número de tarjeta:", cardNumber);
    console.log("Fecha de vencimiento:", expirationDate);
    console.log("Código de seguridad (CVC):", cvc);
    console.log("Total a pagar:", total);

    setLoading(true);
    const cartItems = JSON.parse(localStorage.getItem("compra"));
    const newProduct = {
      nombre: name,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvc: cvc,
      total: total,
      products: cartItems,
      status: "Aprobada",
    };

    // Actualizar Firestore
    const db = getFirestore();
    const productCollection = collection(db, "sales");

    try {
      const docRef = await addDoc(productCollection, newProduct);
      setPaymentSuccess(true);
      setPaymentId(docRef.id);

      // Borrar "cart" y "compra" del local storage
      localStorage.removeItem("cart");
      localStorage.removeItem("compra");

// Reducir el stock de un producto en Firestore
for (const item of cartItems) {
    const productDocRef = doc(db, "productos", item.id);
    const productDoc = await getDoc(productDocRef); // Obtener los datos del producto
    const newStock = parseInt(productDoc.data().stock, 10) - item.quantity;
    await updateDoc(productDocRef, {
      stock: newStock,
    });  
  }
  
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
    return (
    <div>
    <Navbar />

    <Container style={styles.container} fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">Formulario de pago</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Nombre en la tarjeta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre completo"
                required
              />
            </Form.Group>

            <Form.Group controlId="cardNumber">
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]{16}"
                placeholder="1234 5678 9012 3456"
                required
              />
            </Form.Group>

            <Form.Group controlId="expirationDate">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control type="month" required />
            </Form.Group>

            <Form.Group controlId="cvc">
              <Form.Label>Código de seguridad (CVC)</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]{3}"
                placeholder="123"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={styles.paymentButton}
            >
              {loading ? (
                <Ring size={20} lineWeight={5} speed={2} color="black" />
              ) : (
                `Pagar $${total}`
              )}
            </Button>
          </Form>
        </Col>
      </Row>
      {paymentSuccess && <PaymentSuccess paymentId={paymentId} />}
    </Container>
    </div>
  );
};