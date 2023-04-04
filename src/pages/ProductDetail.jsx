import React from "react";
import { Navbar } from "../componentes/navBar";
import { useParams } from "react-router-dom";
import { ProductsData } from "../componentes/json";


export const ProductDetail = () => {
  const { productId } = useParams();
  const producto = ProductsData.find((p) => p.id === productId);
 // se ejecuta la función cada vez que cambia el nombre del producto

  const handleComprarClick = () => {
    const productoAComprar = { productName: producto.nombre, price: producto.precio };
    const cartActual = JSON.parse(localStorage.getItem('cart')) || [];
    cartActual.push(productoAComprar);
    localStorage.setItem('cart', JSON.stringify(cartActual));
  };

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="detalle-producto">
        <div className="card">
          <img src={producto.imagen} alt={producto.nombre} />
          <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">{producto.descripcion}</p>
            <p className="card-text">Precio: ${producto.precio}</p>
            <button className="btn btn-primary" onClick={handleComprarClick}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
