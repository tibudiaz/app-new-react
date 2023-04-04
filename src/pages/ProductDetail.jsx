import React, { useState, useEffect } from "react";
import { Navbar } from "../componentes/navBar";
import { useParams } from "react-router-dom";
import { ProductsData } from "../componentes/json";
import firebase from '../firebaseConfig';


export const ProductDetail = () => {
    const { productId } = useParams();
    const producto = ProductsData.find((p) => p.id === productId);
    const [productoFirebase, setProductoFirebase] = useState(null); // estado para almacenar la información de Firebase
  
    useEffect(() => {
      const dbRef = firebase.database().ref('cart'); // referencia a la carpeta "cart" en Firebase
      dbRef.once("value", (snapshot) => { // obtiene la información de Firebase una sola vez
        snapshot.forEach((childSnapshot) => { // recorre los hijos de la carpeta "cart"
          const childData = childSnapshot.val(); // obtiene los datos de cada hijo
          if (childData.nombre === producto.nombre) { // si el nombre del producto coincide
            setProductoFirebase(childData); // almacena la información de Firebase en el estado
          }
        });
      });
    }, [producto.nombre]); // se ejecuta la función cada vez que cambia el nombre del producto
  
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
              {productoFirebase && (
                <div>
                  <p className="card-text">Estado: {productoFirebase.estado}</p>
                  <p className="card-text">Memoria: {productoFirebase.memoria}Gb</p>
                  <p className="card-text">Batería: {productoFirebase.bat}%</p>
                </div>
              )}
              <button className="btn btn-primary">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  