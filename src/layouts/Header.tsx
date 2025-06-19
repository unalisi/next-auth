'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link';
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from 'framer-motion';
import { slugify } from '@/lib/utils';
import data from '@/data/products.json';

// Icons
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };
const CartIcon: React.FC<IconProps> = (props) => ( <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /> </svg> );
const UserIcon: React.FC<IconProps> = (props) => ( <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> </svg> );
const ChevronDownIcon: React.FC<IconProps> = (props) => ( <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>);


// JSON'dan kategorileri çek
const uniqueCategories = [...new Set(data.products.map(p => p.category))];

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/#allproducts', label: 'Tüm Ürünler' },
  { href: '/category', label: 'Kategoriler', isDropdown: true }, 
  { href: '/hakkimizda', label: 'Hakkımızda' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-800">KayraExport</Link>

          {/* Menü */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
                    {link.label}
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isCategoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          {uniqueCategories.map(category => (
                            <Link 
                              key={category}
                              href={`/category/${slugify(category)}`}
                              onClick={() => setIsCategoryDropdownOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <span className="sr-only">Sepet</span>
              <CartIcon className="h-7 w-7"/>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalCartItems}
                </span>
              )}
            </Link>
            
            {/* User login */}
            <UserIcon className="h-7 w-7 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"/>
          </div>

          {/* Mobil Menü aç-kapa */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700">
              {isMobileMenuOpen ? 'Kapat' : 'Menü'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={closeAllMenus} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4 space-y-1">
                <Link href="/cart" onClick={closeAllMenus} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">Sepetim</Link>
                <Link href="/hesabim" onClick={closeAllMenus} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">Hesabım</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;