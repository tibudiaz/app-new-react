import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./imageMuestra.css";
import Yellow from "./img/14yellow.jpg";
import proo from "./img/14proo.jpg";
import watch from "./img/applewatch.jpg";

export class ImageMuestra extends Component {
  state = {
    images: [
      { id: 1, url: Yellow, text: "Texto para imagen 1" },
      { id: 2, url: proo, text: "Texto para imagen 2" },
      { id: 3, url: watch, text: "Texto para imagen 3" },
    ],
  };

  render() {
    const { images } = this.state;
    return (
      <div className="header">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          speed= {2000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <img src={image.url} alt="" />
              <div className='text'>{image.text}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}

