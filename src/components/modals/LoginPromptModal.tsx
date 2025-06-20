"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Arka Plan Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal İçeriği */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-8 text-center"
          >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="Kapat"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giriş Yapmalısınız</h2>
            <p className="text-gray-600 mb-6">
              Sepetinizi görüntülemek ve ödeme adımlarına devam etmek için lütfen giriş yapın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/login" 
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Giriş Yap
              </Link>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Daha Sonra
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}