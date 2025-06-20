"use client";

import { useCart } from "../../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

interface DashboardProps {
  user: any; 
}

export default function UserDashboard({ user }: DashboardProps) {
  const { cartItems } = useCart();

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const isGoogleUser = user && user.sub?.startsWith("google-oauth2|");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Hesap Bilgileri */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Hesap Bilgilerim</h2>
        <div className="mb-4">
          {isGoogleUser && user.picture ? (
            <Image
              src={user.picture}
              alt={user.name || "Profil Fotoğrafı"}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-gray-500" />
            </div>
          )}
        </div>
        <p>
          <strong>İsim:</strong> {user.name}
        </p>
        <p>
          <strong>E-posta:</strong> {user.email}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          E-posta Doğrulanmış: {user.email_verified ? "Evet" : "Hayır"}
        </p>
      </div>

      {/* Sepet Bilgileri */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Sepetim</h2>
        {cartItems.length > 0 ? (
          <div className="flex flex-col flex-grow h-full">
            <ul className="space-y-4 flex-grow">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} adet
                      </p>
                    </div>
                  </div>
                  <div className="text-right sm:text-left">
                    <span className="font-semibold text-lg text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} TL
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <div className="flex justify-between font-bold text-xl py-4 border-t">
                <span>Toplam Tutar:</span>
                <span>{totalPrice.toFixed(2)} TL</span>
              </div>
              <Link
                href="/cart"
                className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Sepete Git ve Ödemeyi Tamamla
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Sepetiniz şu anda boş.</p>
        )}
      </div>
    </div>
  );
}
