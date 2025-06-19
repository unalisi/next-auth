"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Props {
  images: string[];
}

const ProductImageSlider: React.FC<Props> = ({ images }) => {
  return (
    <div className="w-full aspect-w-1 aspect-h-1">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full rounded-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Ürün görseli ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;