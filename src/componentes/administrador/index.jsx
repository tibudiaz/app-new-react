import React, { useState } from 'react';
import { firebase } from "../../firebaseConfig";
import "./style.css";

const AddProductForm = () => {
  const [formValues, setFormValues] = useState({
    bat: '0',
    color: 'Space Gray',
    estado: 'Usado',
    memoria: '64',
    name: 'iPhone 8',  // valor predeterminado seleccionado
    price: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const db = firebase.firestore();
      const collectionRef = db.collection('productos');
      await collectionRef.add(formValues);
      setFormValues({
        bat: '0',
        color: 'Space Gray',
        estado: 'Usado',
        memoria: '64',
        name: 'iPhone 8', // restablecer el valor predeterminado después de enviar el formulario
        price: '',
      });
      console.log('Producto agregado correctamente.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <select id="name" name="name" value={formValues.name} onChange={handleInputChange}>
            <option value="iPhone 8">iPhone 8</option>
            <option value="iPhone 8 Plus">iPhone 8 Plus</option>
            <option value="iPhone X">iPhone X</option>
            <option value="iPhone Xr">iPhone Xr</option>
            <option value="iPhone Xs">iPhone Xs</option>
            <option value="iPhone Xs Max">iPhone Xs Max</option>
            <option value="iPhone 11">iPhone 11</option>
            <option value="iPhone 11 Pro">iPhone 11 Pro</option>
            <option value="iPhone 11 Pro Max">iPhone 11 Pro Max</option>
            <option value="iPhone 12">iPhone 12</option>
            <option value="iPhone 12 Pro">iPhone 12 Pro</option>
            <option value="iPhone 12 Pro Max">iPhone 12 Pro Max</option>
            <option value="iPhone 13">iPhone 13</option>
            <option value="iPhone 13 Pro">iPhone 13 Pro</option>
            <option value="iPhone 13 Pro Max">iPhone 13 Pro Max</option>
            <option value="iPhone 14">iPhone 14</option>
            <option value="iPhone 14 Plus">iPhone 14 Plus</option>
            <option value="iPhone 14 Pro">iPhone 14 Pro</option>
            <option value="iPhone 14 Pro Max">iPhone 14 Pro Max</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Precio:</label>
          <input type="number" id="price" name="price" value={formValues.price} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="bat">Batería:</label>
          <input type="text" id="bat" name="bat" value={formValues.bat} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <select id="color" name="color" value={formValues.color} onChange={handleInputChange}>
          <option value="Space Gray">Space Gray</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
          <option value="Rose Gold">Rose Gold</option>
          <option value="Red">Red</option>
          <option value="Midnight Green">Midnight Green</option>
          <option value="Purple">Purple</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="PRODUCT(RED)">PRODUCT(RED)</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Coral">Coral</option>
          <option value="Yellow">Yellow</option>        
          </select>
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select id="estado" name="estado" value={formValues.estado} onChange={handleInputChange}>
            <option value="Usado">Usado</option>
            <option value="Nuevo">Nuevo</option>        
          </select>
        </div>
        <div>
          <label htmlFor="memoria">Memoria:</label>
          <select id="memoria" name="memoria" value={formValues.memoria} onChange={handleInputChange}>
          <option value="64">64</option>
          <option value="128">128</option>
          <option value="256">256</option>
          <option value="512">512</option>
          <option value="1024">1Tb</option>    
          </select>
        </div>
        <button className='btnasd' type="submit">Agregar producto</button>
      </form>
    </div>
  );
};

export default AddProductForm;
