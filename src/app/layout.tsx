import "./globals.css";
import Header from "../layouts/Header";
// import Footer from "../layouts/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kayra Export E-Ticaret",
  description: "Kaliteli ve şık ev tekstili ürünleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen  mx-auto  py-8">
            {children}
          </main>
          {/* <Footer /> */}
        </CartProvider>
      </body>
    </html>
  );
}