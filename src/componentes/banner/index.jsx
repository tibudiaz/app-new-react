import React, { useState, useEffect } from "react";
import { storage } from "../../firebaseConfig.js";
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./style.css"

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Banner = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Obtener las URLs de descarga de las imágenes de Firebase Storage
    const storageRef = storage.ref();
    const imagesRef = storageRef.child("banner/");
    imagesRef.listAll().then((result) => {
      const urls = [];
      result.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          urls.push(url);
          setImageUrls(urls);
        });
      });
    });

  }, []);

  return (
    <div className="banner">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          "delay": 5000,
          "disableOnInteraction": false
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {imageUrls.map((url) => (
          <SwiperSlide key={url}>
            <img src={url} alt="Banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
