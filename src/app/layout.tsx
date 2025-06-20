import "./globals.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CartContext";

import { auth0 } from "../../lib/auth0";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kayra Export E-Ticaret",
  description: "Kaliteli ve şık ev tekstili ürünleri",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  const user = session?.user || null;

  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          <Header user={user} />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
