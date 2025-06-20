'use client';

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
        <p className="text-gray-600 mb-8">Hemen alışverişe başlayın ve harika ürünleri keşfedin!</p>
        <Link href="/" className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Sepetim ({cartItems.length} ürün)</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ürün Listesi */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <Image src={item.images[0]} alt={item.title} fill style={{ objectFit: "cover" }} className="rounded-md" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-500">{item.price.toFixed(2)} TL x {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Kaldır
              </button>
            </div>
          ))}
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:col-span-1">
          <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Ara Toplam</span>
              <span>{subtotal.toFixed(2)} TL</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Kargo</span>
              <span>Ücretsiz</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Toplam</span>
              <span>{subtotal.toFixed(2)} TL</span>
            </div>
            <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
              Ödemeye Geç
            </button>
            <button onClick={clearCart} className="mt-2 w-full text-center text-sm text-gray-500 hover:text-red-500">
                Sepeti Temizle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}