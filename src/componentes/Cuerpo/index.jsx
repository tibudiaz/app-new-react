import React, { useState, useEffect } from 'react';
import ImageSlider from './imagenes';
import './style.css';
import logo1 from './img/logo2.jpg';
import logo2 from './img/logo2oro.jpg';
import logo3 from './img/logo2plata.jpg';
import logo4 from './img/logo2negro.jpg';
import Logo from './img/large.mp4';

export const Propaganda = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [showNombre, setShowNombre] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
      setShowSlider(true);
      clearInterval(interval);
    }, 10000); // mostrar el slider después de 10 segundos
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => prevOpacity - 0.1);
    }, 100);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowSlider(true);
    setShowNombre(false);
  };

  return (
    <div>
      {showVideo && (
        <div className='Propaganda'>
          {showNombre && (
            <img
              className={`Nombre ${showVideo ? 'bounce' : ''}`}
              src='./img/nombre.jpg'
              alt=''
              style={{ opacity }}
            />
          )}
          <video className='Logo' autoPlay muted onEnded={handleVideoEnd}>
            <source src={Logo} type='video/mp4' />
            Tu navegador no admite la reproducción de videos.
          </video>
        </div>
      )}
      {showSlider && <ImageSlider images={[logo1, logo2, logo3, logo4]} />}
    </div>
  );
};

