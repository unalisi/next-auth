'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { useCart } from '../context/CartContext';

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  const { addToCart } = useCart();
  const productSlug = slugify(product.title);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    e.preventDefault();
    addToCart(product);
    // alert(`${product.title} sepete eklendi!`); 
  };

  return (
    <Link href={`/products/${product.id}-${productSlug}`} className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="mt-2 text-xl font-bold text-gray-900">{product.price.toFixed(2)} TL</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sepete Ekle
        </button>
      </div>
    </Link>
  );
};

export default Card;