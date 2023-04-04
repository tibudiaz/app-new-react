import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import p1 from './img/p1.jpg';
import p2 from './img/p2.jpg';
import p3 from './img/p3.jpg';
import p4 from './img/p4.jpg';
import p5 from './img/p5.jpg';
import p6 from './img/p6.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export const IphSlider = () => {
    return (
        <div className='cuerpoIph14'>
        <div className='primerParte'>
            <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            speed={1000}
            >
            <SwiperSlide>
                <img src={p1} alt='iPhone 14' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={p2} alt='iPhone 14' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={p3} alt='iPhone 14' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={p4} alt='iPhone 14' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={p5} alt='iPhone 14' />
            </SwiperSlide>
            <SwiperSlide>
                <img src={p6} alt='iPhone 14' />
            </SwiperSlide>
            </Swiper>
        </div>
        </div>
    );
    };


