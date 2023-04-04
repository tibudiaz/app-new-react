import React, { useState, useEffect } from "react";
import './style.css'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items.reduce((acc, item) => {
      const existingItemIndex = acc.findIndex(cartItem => cartItem.productName === item.productName && cartItem.price === item.price);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += 1;
      } else {
        acc.push({...item, quantity: 1});
      }
      return acc;
    }, []));
  }, []);

  useEffect(() => {
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const handleStorageUpdate = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items.reduce((acc, item) => {
      const existingItemIndex = acc.findIndex(cartItem => cartItem.productName === item.productName && cartItem.price === item.price);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += 1;
      } else {
        acc.push({...item, quantity: 1});
      }
      return acc;
    }, []));
  };

  const updateItemQuantity = (index, quantity) => {
    if (quantity < 1) {
      return;
    }
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart__container">
      <p className="titulo__carrito">Carrito de compras</p>
      {cartItems.length === 0 ? (
        <p className="objetos__cart">No hay artículos en el carrito</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.productName}</p>
              <p>{item.price.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</p>
              <div>
                <button onClick={() => updateItemQuantity(index, item.quantity - 1)}> - </button>
                <p>{item.quantity}</p>
                <button onClick={() => updateItemQuantity(index, item.quantity + 1)}> + </button>
              </div>
              <button onClick={() => removeItem(index)}>Eliminar</button>
            </div>
          ))}
          <p className="objetos__cart">Total: {totalPrice.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</p>
          <button className="btn11">Comprar</button>
        </div>
      )}
    </div>
  );
};
