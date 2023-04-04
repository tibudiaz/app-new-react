import React, { useState, useEffect } from "react";
import "./style.css";

export function Purchase() {
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  useEffect(() => {
    // Obtener el precio del producto guardado para compra
    const priceStr = localStorage.getItem("price");
    const price1 = parseFloat (priceStr.replace(",", ""));

    if (price1) {
      // Calcular las opciones de cuotas utilizando la calculadora
      function calcularCuotas() {
        var valor1 = price1 + 10000;
        // Calcular los intereses
        var interes3 = valor1 * 0.2051097;
        var interes6 = valor1 * 0.3344009;
        var interes12 = valor1 * 0.6369291;
      
        // Calcular los totales y convertirlos a números enteros
        var total3 = Math.floor((valor1 + interes3) / 1);
        var total6 = Math.floor((valor1 + interes6) / 1);
        var total12 = Math.floor((valor1 + interes12) / 1);
    
        // Calcular las cuotas
        var cuota3 = total3 / 3;
        var cuota6 = total6 / 6;
        var cuota12 = total12 / 12;




        setInstallmentOptions([
          { months: 3, installment: cuota3.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}), total: total3.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}) },
          { months: 6, installment: cuota6.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}), total: total6.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}) },
          { months: 12, installment: cuota12.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}), total: total12.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'}) },
        ]);
      }

      calcularCuotas();
    }
  }, []);

  function handleSelectInstallment(option) {
    setSelectedInstallment(option);
  }

  function handleBuy() {
    const selectedOption = selectedInstallment || installmentOptions[0];
    const cartItem = {
      productName: localStorage.getItem("productName"),
      price: parseFloat(localStorage.getItem("price")),
      installmentOption: selectedOption,
    };

    // Agregar el item al carrito en localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div className="card8">
      <h3>Producto: {localStorage.getItem("productName")}</h3>
      <h4>Precio en pesos: ${localStorage.getItem("price")}</h4>
      <h5>Opciones de pago en cuotas:</h5>
      <ul>
        {installmentOptions.map((option) => (
          <li
            key={option.months}
            onClick={() => handleSelectInstallment(option)}
            className={
              selectedInstallment === option ? "selectedOption" : null
            }
          >
            {option.months} cuotas de {option.installment} (total: 
            {option.total})
          </li>
        ))}
      </ul>
      <button className="btn123" onClick={handleBuy}>
        Comprar
      </button>
    </div>
  );
}
