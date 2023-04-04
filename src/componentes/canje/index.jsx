import React, { useState, useEffect } from "react";
import "./canje.css";

const prices = {
  "iPhone 8": 200,
  "iPhone 8 Plus": 220,
  "iPhone X": 250,
  "iPhone 11": 390,
  "iPhone 11 Pro": 450,
  "iPhone 11 Pro Max": 500,
  "iPhone 12": 480,
  "iPhone 12 Pro": 630,
  "iPhone 12 Pro Max": 680,
  "iPhone 13": 650,
  "iPhone 13 Pro": 850,
  "iPhone 13 Pro Max": 950,
  "iPhone 14": 780,
  // "iPhone 14 Pro": 2200,
  // "iPhone 14 Pro Max": 2400
};

function getPriceInPesos(priceUsd, exchangeRate) {
  const price = (priceUsd / 100) * (exchangeRate + 300);
  return price;
}

function cotizar(model, memorySize, batteryCondition, setQuoteResult, exchangeRate) {
  let priceUsd = prices[model] + Math.floor((memorySize - 64) / 64) * 20;

  if (batteryCondition < 80) {
    if (model.includes("iPhone 8") || model.includes("iPhone X")) {
      priceUsd -= 30;
    } else {
      priceUsd -= 60;
    }
  } else if (batteryCondition < 90) {
    if (model.includes("iPhone 8") || model.includes("iPhone X")) {
      priceUsd -= 15;
    } else {
      priceUsd -= 30;
    }
  }

  const price = getPriceInPesos(priceUsd, exchangeRate);
  setQuoteResult({
    price: price.toLocaleString(),
    priceUsd: priceUsd,
    model: model,
    memorySize: memorySize,
    batteryCondition: batteryCondition,
  });
}
function saveQuote(quoteResult) {
    const quote = JSON.stringify(quoteResult);
    localStorage.setItem('quote', quote);
  }
  

export function CotizarApp() {
  const [modelName, setModelName] = useState("");
  const [memory, setMemory] = useState("");
  const [batteryCondition, setBatteryCondition] = useState("");
  const [quoteResult, setQuoteResult] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = () => {
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
      .then((response) => response.json())
      .then((data) => {
        const blueDollar = data.find((x) => x.casa.nombre === "Dolar Blue");
        const exchangeRateValue = parseFloat(blueDollar.casa.venta.replace(",", ""));
        setExchangeRate(exchangeRateValue);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
      });
  };
  return (
    <div className="canje__cot">
        <div className="canje__coti">
            <div>
                <label>¿Que modelo tienes?</label> <br />
                <select value={modelName} onChange={(e) => setModelName(e.target.value)}>
                    <option value="">Seleccionar modelo</option>
                    <option value="iPhone 8">iPhone 8</option>
                    <option value="iPhone 8 Plus">iPhone 8 Plus</option>
                    <option value="iPhone X">iPhone X</option>
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
                </select>
            </div>
        <div>
            <label>¿Cantidad de Memoria?</label><br />
            <select value={memory} onChange={(e) => setMemory(e.target.value)}>
            <option value="">Seleccionar memoria</option>
                <option value="64">64GB</option>
                <option value="128">128GB</option>
                <option value="256">256GB</option>
                <option value="512">512GB</option>
            </select>
        </div>
        <div>
            <label>¿Cual es la condición de bateria?</label><br />
            <input
            type="number"
            value={batteryCondition}
            onChange={(e) => setBatteryCondition(e.target.value)}
            />
        </div>

        <button className="btn123" onClick={() => cotizar(modelName, memory, batteryCondition, setQuoteResult, exchangeRate)}>Cotizar</button>
        </div>
        {quoteResult && (
            <div className="card__canje">
            <h3>Resultados de la cotización</h3>
            <p>Modelo: {quoteResult.model}</p>
            <p>Memoria: {quoteResult.memorySize} GB</p>
            <p>Condición de batería: {quoteResult.batteryCondition}%</p>
            <p>Precio en dólares: {quoteResult.priceUsd}USD</p>
            <p>Precio en pesos: ${quoteResult.price}</p>
            <button className="btn123" onClick={() => {
            const confirmSave = window.confirm("¿Está seguro de que desea guardar la cotización?");
            if (confirmSave) {
                saveQuote(quoteResult);
            }
            }}>
            Aceptar cotización
            </button>

                        </div>
                    )}

                </div>
            );
}

