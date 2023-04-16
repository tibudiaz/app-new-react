import React, { useState, useEffect } from "react";
import { Navbar } from "../componentes/navBar";
import { useParams } from "react-router-dom";
import { Catalog } from "../componentes/Catalogo";
import { storage } from "../firebaseConfig.js";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";


// Importar módulos de Firebase Firestore
import { getFirestore, doc, getDoc } from "firebase/firestore";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export const ProductDetail = () => {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [setError] = useState(null);
  const [stock, setStock] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensajeStock, setMensajeStock] = useState(null);


  useEffect(() => {
    const getExchangeRate = () => {
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
          const blueDollar = data.find(x => x.casa.nombre === 'Dolar Blue');
          const exchangeRateValue = parseFloat(blueDollar.casa.venta.replace(',', ''));
          setExchangeRate(exchangeRateValue);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching exchange rate:', error);
          setError('Error fetching exchange rate. Please try again later.');
        });
    };

    getExchangeRate();
    const interval = setInterval(() => {
      getExchangeRate();
    }, 1000 * 60 * 10); // actualiza la cotización cada 10 minutos

    return () => clearInterval(interval);
  }, );

  const getPriceInARS = (price) => {
    const priceInARS = Math.floor((price / 100) * (exchangeRate + 0.3));
    return `$${priceInARS.toLocaleString()}`;
  };

  const getBatteryInfo = (product) => {
    if (product.bat < 10 && product.estado === 'Nuevo') {
      return <span className="nuevo">Equipo Nuevo</span>;;
    } else {
      const batteryPercentage = `Bateria: ${product.bat}%`;
      let batteryClass;
      if (product.bat >= 90) {
        batteryClass = 'green';
      } else if (product.bat >= 80) {
        batteryClass = 'orange';
      } else {
        batteryClass = 'red';
      }
      return <span className={`battery ${batteryClass}`}>{batteryPercentage}</span>;
    }
  };

  useEffect(() => {
    // Obtener referencia a la colección de productos
    const db = getFirestore();
    const productoRef = doc(db, "productos", productId);
  
    // Obtener datos del producto desde Firestore
    getDoc(productoRef)
      .then((doc) => {
        if (doc.exists()) {
          setProducto(doc.data());
          setStock(doc.data().stock);
          if (doc.data().stock === 1) {
            setMensajeStock("Ultimo en Stock");
          }
        } else {
          console.log("No se encontró el producto");
        }
        
      })
      .catch((error) => {
        console.log("Error al obtener el producto:", error);
      });
  
    const storageRef = storage.ref("/productos/" + productId);
    storageRef.listAll().then((res) => {
      const promises = res.items.map((itemRef) => itemRef.getDownloadURL());
      Promise.all(promises).then((urls) => setImagenes(urls));
    });
  }, [productId]);
  
  const handleCantidadChange = (event) => {
    const newCantidad = parseInt(event.target.value);
    if (!isNaN(newCantidad) && newCantidad >= 1 && producto && newCantidad <= producto.stock) {
      setCantidad(newCantidad);
      if (newCantidad === producto.stock) {
        setMensajeStock("Ultimo en Stock");
      } else if (newCantidad >= producto.stock) {
        setMensajeStock("No puedes agregar más productos al carrito.");
      } else {
        setMensajeStock(null);
      }
    }
  };

  const handleComprarClick = () => {
    const productoAComprar = {
      productName: producto.name,
      price: getPriceInARS(producto.price),
      productId: productId,
      quantity: cantidad,
    };
  
    const cartActual = JSON.parse(localStorage.getItem("cart")) || [];
    let found = false;
    cartActual.forEach((item) => {
      if (item.productId === productId) {
        found = true;
        const newQuantity = item.quantity + cantidad;
        if (newQuantity > stock) {
          setMensajeStock("No puedes agregar más productos.");
          return;
        }
        item.quantity = newQuantity;
      }
    });
    if (!found) {
      if (cantidad > stock) {
        setMensajeStock("No puedes agregar más productos.");
        return;
      }
      cartActual.push(productoAComprar);
    }
    localStorage.setItem("cart", JSON.stringify(cartActual));
  };
  

  

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="detalle-producto">
        <div className="card">
          <Swiper navigation pagination autoplay>
            {imagenes.map((url, index) => (
              <SwiperSlide key={index}>
                <img src={url} alt={producto.nombre} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
          <div className="card-body">
            <h5 className="card-title">{producto.name}</h5>
            <p className="card-text">{producto.descripcion}</p>
            <div className="card-text">{getBatteryInfo(producto)}</div>
            <p className="card-text">Color: {producto.color}</p>
            <p className="card-text">Estado: {producto.estado}</p>
            <p className="card-text">Memoria: {producto.memoria}</p>
            <p className="card-text">Precio: {getPriceInARS(producto.price)}</p>
            <div className="form-group">
            <label htmlFor="cantidadInput">Cantidad:</label>
            <input type="number" className="form-control" id="cantidadInput" value={cantidad} onChange={handleCantidadChange} min="1" max={producto.stock} />
          </div>
          <div className="mensaje-stock">{mensajeStock}</div>
            <button className="btnasd" onClick={handleComprarClick}>Agregar al carrito</button>
          </div>
      </div>
      <Catalog />
    </div>
  );
};
