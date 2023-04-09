import React, { useEffect, useState } from 'react';
import {  } from '../../firebaseConfig';

import { collection, onSnapshot, getFirestore} from "firebase/firestore";

import './catalogo.css';
import { Link } from 'react-router-dom';

// importacion de imagenes para productos:
import iphone8Img from './img/8.jpg'
import iphone8PlusImg from './img/8p.jpg'
import iphoneXImg from './img/x.jpg'
import iphoneXrImg from './img/xr.jpg'
import iphoneXsImg from './img/xs.jpg'
import iphoneXsmImg from './img/xsm.jpg'
import iphone11Img from './img/11.jpg'
import iphone11pImg from './img/11p.jpg'
import iphone11pmImg from './img/11pm.jpg'
import iphone12Img from './img/12.png'
import iphone12pImg from './img/12p.png'
import iphone12pmImg from './img/12pm.png'
import iphone13Img from './img/13.jpg'
import iphone13pImg from './img/13p.jpg'
import iphone13pmImg from './img/13pm.jpg'
import iphone14Img from './img/14.jpg'
import iphone14pImg from './img/14p.jpg'
import iphone14pmImg from './img/14pm.jpg'


// objeto con la ruta de las imágenes correspondientes a cada nombre de producto
const images = {
  'iPhone 8': iphone8Img,
  'iPhone 8 Plus': iphone8PlusImg,
  'iPhone X': iphoneXImg,
  'iPhone Xr': iphoneXrImg,
  'iPhone Xs': iphoneXsImg,
  'iPhone Xs Max': iphoneXsmImg,
  'iPhone 11': iphone11Img,
  'iPhone 11 Pro': iphone11pImg,
  'iPhone 11 Pro Max': iphone11pmImg,
  'iPhone 12': iphone12Img,
  'iPhone 12 Pro': iphone12pImg,
  'iPhone 12 Pro Max': iphone12pmImg,
  'iPhone 13': iphone13Img,
  'iPhone 13 Pro': iphone13pImg,
  'iPhone 13 Pro Max': iphone13pmImg,
  'iPhone 14': iphone14Img,
  'iPhone 14 Pro': iphone14pImg,
  'iPhone 14 Pro Max': iphone14pmImg,
};



const db = getFirestore();
const productsCollection = collection(db, 'productos');


export function Catalog() {
  const [products, setProducts] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsArr = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          key: doc.id,
        };
      });
      setProducts(productsArr);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

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
  }, []);

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

  return (
    <div className="catalogo">
      {error && <div className="error-message">{error}</div>}
      {products.map((product) => (
        <div
          className={`product-card ${
            product.estado === 'Nuevo' ? 'new-product' : 'used-product'
          }`}
          key={product.key}
        >
          <img
            className="product-image"
            src={images[product.name]}
            alt={`Imagen de ${product.name}`}
            data-name={product.name}
            data-color={product.color}
            data-mem={product.memoria}
            data-bat={product.bat}
          />
          <div className="product-info">
            <h3 className="product-name2">{product.name}</h3>
            <p className="product-description">Memoria: {product.memoria}Gb</p>
            <p className="product-description">{getBatteryInfo(product)}</p>
            <p className="product-price">{getPriceInARS(product.price)}</p>
            <div className="product-buttons">
              <button className="buy-button">Comprar</button>
              <Link to={`/products/${product.key}`} replace> Ver más</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

