import React, { useState } from "react";
import { Navbar } from "../componentes/navBar";
import { IphSlider12 } from "../componentes/iph12";
import { CotizarApp } from "../componentes/canje";
import './style.css'
import { Purchase } from "../componentes/comprar";

export const Iph12 = () => {
  const [showCotizar, setShowCotizar] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showComprar, setShowComprar] = useState(false);

  const handleCotizarClick = () => {
    setShowCotizar(true);
    setShowOptions(true);
    setShowComprar(false);
  };

  const handleComprarClick = () => {
    setShowComprar(true);
    setShowOptions(true);
    setShowCotizar(false);
  };

  return (
    <div>
      <Navbar />
      <h1 className="comprarIphone">Comprar iPhone 12</h1>
      <IphSlider12 />
      {showOptions && (
        <div className="card__opciones">
          <p className="compra__opciones">Opciones de compra:</p>
          <div className="botones__opciones">
          <button className="btn12" onClick={handleCotizarClick}>
            Cotizar entrega de dispositivo
          </button>
          <button className="btn12" onClick={handleComprarClick}>
            Comprar sin entrega
          </button>
          </div>
        </div>
      )}
      {showCotizar && <CotizarApp />}
      {showComprar && <Purchase />}
    </div>
  );
};

