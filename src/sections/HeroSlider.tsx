"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const sliderImages = [
  { id: 1, src: '/sliders/slider-1.jpg', alt: 'Yaz Koleksiyonu', href: '#' },
  { id: 2, src: '/sliders/slider-2.jpg', alt: 'Yeni Sezon Elektronikler', href: '#' },
  { id: 3, src: '/sliders/slider-3.jpeg', alt: 'Ev Dekorasyonu', href: '#' },
];

const HeroSlider = () => {
  return (
    <section className="w-full h-[60vh] md:h-[600px] bg-black"> 
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="w-full h-full"
      >
        {sliderImages.map((image) => (
          <SwiperSlide key={image.id} className="relative overflow-hidden">
            <Link href={image.href} className="block w-full h-full">
              
              {/* Bulanık arka plan */}
              <Image
                src={image.src}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                className="blur-2xl scale-110 brightness-75"
                aria-hidden="true"
              />

              {/* Ana görsel */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: 'contain' }}
                priority={image.id === 1}
                sizes="(max-width: 768px) 100vw, 600px"
                className="z-10" 
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;