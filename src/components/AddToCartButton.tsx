'use client';

import { useCart } from "../context/CartContext";
import { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart(product);
        alert(`${product.title} sepete eklendi!`);
      }}
      className="w-full bg-blue-600 text-white py-3 px-8 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Sepete Ekle
    </button>
  );
}