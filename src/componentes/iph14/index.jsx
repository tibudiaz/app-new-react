import React from 'react';
import './style.css';
import phoneImage from './img/1.jpg';
import phoneImage2 from './img/2.jpg';
import phoneImage3 from './img/3.jpg';
import { IphSlider } from './slick';

export const Iph = () => {
  return (
    <div className='cuerpoIph14'>
      <div className='primerParte'>
            <IphSlider className='primerParte'/>
      </div>
      <div className='segundaParte'>
      <h1 className='tituloIph14'>Grande y más grande</h1>
      <img src={phoneImage} alt="Imagen de un celular" />
      </div>
      <div className='tercerParte'>
        <p className='descripcionPlus'>El iPhone 14 Plus tiene un 21% mas de pantalla, lo que lo hace super grande pero sorprendentemente liviano
            <br />
            <br />
            <br />
            Ambos modelos tienen una vibrante pantalla Super Retina XDR. Y tecnologia OLED para blancos brillantes y negros verdaderos.
        </p>
      <img src={phoneImage2} alt="Imagen de un celular" />
      </div>
      <div className='cuartaParte'>
        <p className='resolucion'>La alta resolución y la precisión del color hacen que todo se vea nítido y real .</p>
        <img src={phoneImage3} alt="celular" />
      </div>
    </div>
  );
}


