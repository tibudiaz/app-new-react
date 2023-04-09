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
        console.log(productsData); // Agregamos un console.log para depurar
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

  const checkFolderExistence = async (productId) => {
    const storageRef = firebase.storage().ref(`productos/${productId}`);
    const folderExists = await storageRef.listAll().then((res) => {
      const folders = res.prefixes.map((folder) => folder.name);
      return folders.includes(productId);
    }).catch(() => false);
    console.log(`La carpeta productos/${productId} existe: ${folderExists}`); // Agregamos un console.log para depurar
    return folderExists;
  };

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ color: checkFolderExistence(product.id) ? 'green' : 'red' }}>
            <span>{product.id} - </span>
            <span>{product.name} - </span>
            <span>${product.price} - </span>
            <span>{checkFolderExistence(product.id) ? 'TIENE FOTO' : 'NO TIENE FOTO'}</span>
            <button className='btnasd' onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
