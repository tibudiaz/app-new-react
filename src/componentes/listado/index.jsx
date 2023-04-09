import React, { useEffect, useState } from 'react';
import { firebase } from "../../firebaseConfig";


export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = firebase.firestore();
        const productsRef = db.collection('productos');
        const productsSnapshot = await productsRef.get();
        const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const db = firebase.firestore();
      const productRef = db.collection('productos').doc(productId);
      await productRef.delete();
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      console.log('Producto eliminado correctamente.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <span>{product.id} - </span>
            <span>{product.name} - </span>
            <span>${product.price} - </span>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


