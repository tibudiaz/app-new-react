import { useState, useEffect } from "react";
import mercadopago from "mercadopago";

export const Checkout = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Obtener los productos del carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    setCart(cartItems);
  }, []);

  const handleCheckout = () => {
    // Configurar las credenciales de Mercado Pago
    mercadopago.configure({
      access_token: "TU_ACCESS_TOKEN_DE_MERCADO_PAGO",
    });

    // Crear un objeto de preferencia de Mercado Pago con los productos del carrito
    const preference = {
      items: cart.map((product) => {
        return {
          title: product.name,
          unit_price: product.price,
          quantity: product.quantity,
        };
      }),
      back_urls: {
        success: "http://localhost:3000//success",
        failure: "http://localhost:3000//failure",
        pending: "http://localhost:3000//pending",
      },
      auto_return: "approved",
    };

    // Crear una instancia de Mercado Pago Checkout
    const checkout = new mercadopago.Checkout({
      preference,
    });

    // Abrir el checkout de Mercado Pago
    checkout.open();
  };

  return (
    <div>
      <button onClick={handleCheckout}>Pagar</button>
    </div>
  );
};



