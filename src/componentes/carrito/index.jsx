import React, { useState, useEffect } from 'react';
import "./style.css"
import { Link } from 'react-router-dom';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    const processedItems = items.map(item => {
      return {
        ...item,
        price: parseFloat(item.price.replace("$", ""))
      }
    }).filter(item => item.productName && item.price && item.quantity);
    setCartItems(processedItems);
  }, []);

  function removeItem(index) {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  function formatPrice(price) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3 }).format(price);
  }

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotalPrice(formatPrice(newTotalPrice));
  }, [cartItems]);

  function handleCompra() {
    const newTotalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const compra = {
      items: cartItems.map(item => ({
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
        id: item.productId
      })),
      total: newTotalPrice
    };
    localStorage.setItem('compra', JSON.stringify(compra));
  }
  
  
  return (
    <div className="cart__container">
      <p className="titulo__carrito">Carrito de compras ({cartItems.length} {cartItems.length > 1 ? 'productos' : 'producto'})</p>
      {cartItems.length === 0 ? (
        <p className="objetos__cart">No hay artículos en el carrito</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.productName}</p>
              <p>Precio: ${item.price}</p>
              <div>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <button onClick={() => removeItem(index)}>Eliminar</button>
            </div>
          ))}
          <p className="objetos__cart">Total: {totalPrice}</p>
          <Link to="/payment">
            <button onClick={handleCompra} className="btn11">Comprar</button>
          </Link>
        </div>
      )}
    </div>
  );
}
