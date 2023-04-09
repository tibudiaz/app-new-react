import React, { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// config firebase

import { firebase } from '../../firebaseConfig';




// imagenes de celulares nuevos
import p1 from './img/iph12v.jpeg';
import p2 from './img/iph12vt.jpeg';
import p3 from './img/iph12vc.jpeg';
import p4 from './img/iph12a.jpeg';
import p5 from './img/iph12at.jpeg';
import p6 from './img/iph12ac.jpeg';
import p7 from './img/iph12vi.jpeg';
import p8 from './img/iph12vit.jpeg';
import p9 from './img/iph12vic.jpeg';
import p10 from './img/iph12w.jpeg';
import p11 from './img/iph12wt.jpeg';
import p12 from './img/iph12wc.jpeg';
import p13 from './img/iph12r.jpeg';
import p14 from './img/iph12rt.jpeg';
import p15 from './img/iph12rc.jpeg';
import p16 from './img/iph12b.jpeg';
import p17 from './img/iph12bt.jpeg';
import p18 from './img/iph12bc.jpeg';


import './slider12.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export const IphSlider12 = () => {
    const [selectedColor, setSelectedColor] = useState(localStorage.getItem('selectedColor') || 'Verde');
    const images = [ 
        { color: 'Verde', src: p1 },
        { color: 'Verde', src: p2 },
        { color: 'Verde', src: p3 },
        { color: 'Azul', src: p4 },
        { color: 'Azul', src: p5 },
        { color: 'Azul', src: p6 },
        { color: 'Violeta', src: p7 },
        { color: 'Violeta', src: p8 },
        { color: 'Violeta', src: p9 },
        { color: 'Blanco', src: p10 },
        { color: 'Blanco', src: p11 },
        { color: 'Blanco', src: p12 },
        { color: 'Product-Red', src: p13 },
        { color: 'Product-Red', src: p14 },
        { color: 'Product-Red', src: p15 },
        { color: 'Negro', src: p16 },
        { color: 'Negro', src: p17 },
        { color: 'Negro', src: p18 }, 
        ];

        const [price, setPrice] = useState(null);
        const [price1, setPrice1] = useState(null);
        const [exchangeRate, setExchangeRate] = useState(null);
        
        useEffect(() => {
          firebase.database().ref('iph1264').on('value', (snapshot) => {
            setPrice(getPriceInARS(snapshot.val()));
          });
          firebase.database().ref('iph12128').on('value', (snapshot) => {
            setPrice1(getPriceInARS(snapshot.val()));
          });
        },);
        
        useEffect(() => {
          const getExchangeRate = () => {
            fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
              .then(response => response.json())
              .then(data => {
                const blueDollar = data.find(x => x.casa.nombre === 'Dolar Blue');
                const exchangeRateValue = parseFloat(blueDollar.casa.venta.replace(',', ''));
                setExchangeRate(exchangeRateValue);

              })
              .catch(error => {
                console.error('Error fetching exchange rate:', error);
              });
          };
        
          getExchangeRate();
          const interval = setInterval(() => {
            getExchangeRate();
          }, 1000 * 60 * 10); // actualiza la cotización cada 10 minutos
        
          return () => clearInterval(interval);
        }, []);
        
        const getPriceInARS = (price) => {
          if (exchangeRate === null) {
            return 'Loading...';
          }
          const priceInARS = Math.floor((price / 100) * (exchangeRate + 300));
          return `$${priceInARS.toLocaleString()}`;
        };
        

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        localStorage.setItem('selectedColor', color);
    };

    const filteredImages = selectedColor === 'all'
        ? images
        : images.filter((img) => img.color === selectedColor);

    
const [clicked64GB, setClicked64GB] = useState(false);
const [clicked128GB, setClicked128GB] = useState(false);
const productName = 'iPhone 12';

const handleCardClick = (storageKey, storageValue, price) => {
    localStorage.setItem('productName', productName);
    localStorage.setItem("price", price.replace("$", ""));
  localStorage.setItem(storageKey, storageValue);
  if (storageValue === '64GB') {
    setClicked64GB(true);
    setClicked128GB(false);
  } else if (storageValue === '128GB') {
    setClicked128GB(true);
    setClicked64GB(false);
  }
};


        return (
            <div>
            <div className="contenedor-principal">
            <div className="slider">
                <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                speed={1000}
                >
                {filteredImages.map((img, index) => (
                    <SwiperSlide key={index}>
                    <img src={img.src} alt="iPhone 12" />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            <span className='elijeColor'>Elige tu color favorito. <br />
            <h5> Color - {selectedColor}</h5></span>
            <div className="card1">
                <div className="color" onClick={() => handleColorSelect('Verde')}>
                <div className={`dot Verde ${selectedColor === 'Verde' ? 'selected' : ''}`} />
                
                </div>
                <div className="color" onClick={() => handleColorSelect('Azul')}>
                <div className={`dot Azul ${selectedColor === 'Azul' ? 'selected' : ''}`} />
                
                </div>
                <div className="color" onClick={() => handleColorSelect('Violeta')}>
                <div className={`dot Violeta ${selectedColor === 'Violeta' ? 'selected' : ''}`} />
                
                </div>
                <div className="color" onClick={() => handleColorSelect('Blanco')}>
                <div className={`dot Blanco ${selectedColor === 'Blanco' ? 'selected' : ''}`} />
                
                </div>
                <div className="color" onClick={() => handleColorSelect('Product-Red')}>
                <div className={`dot Product-Red ${selectedColor === 'Product-Red' ? 'selected' : ''}`} />
                
                </div>
                <div className="color" onClick={() => handleColorSelect('Negro')}>
                <div className={`dot Negro ${selectedColor === 'Negro' ? 'selected' : ''}`} />
                </div>
            </div>
            </div>
            <div className='padree'>
            <div className='almacenamiento'>
                    <div>
                    <span>Cuanto espacio necesitas?</span>
                    </div>
                    <div className={`card2 ${clicked64GB ? 'clicked' : ''}`} onClick={() => handleCardClick('iPhone12', '64GB', price)}>
                    <div className="card-title">
                        <h3>64GB</h3>
                    </div>
                    <div className="card-body">
                        <p>{price}</p>
                    </div>
                    </div>
                    <div className={`card2 ${clicked128GB ? 'clicked' : ''}`} onClick={() => handleCardClick('iPhone12', '128GB', price1)}>
                        <div className="card-title">
                            <h3>128GB</h3>
                        </div>
                        <div className="card-body">
                            <p>{price1}</p>
                        </div>
                        </div>

            </div>
            </div>
            </div>
        );
    };

