import React from "react";
import Link from "next/link";
import data from "@/data/products.json"; 
import { slugify } from "@/lib/utils"; 

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const footerLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/#allproducts", label: "Tüm Ürünler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/dashboard", label: "Hesabım" },
];

const socialLinks = [
  { href: "https://www.github.com/unalisi", label: "GitHub", icon: GithubIcon },
  {
    href: "https://www.linkedin.com/in/unalisi",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
];

const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
const categoryLinks = uniqueCategories.map((category) => ({
  href: `/category/${slugify(category)}`,
  label: category,
}));

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-center sm:items-start">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 tracking-tight"
            >
              KayraExport
            </Link>
            <p className="mt-2 text-gray-500 text-center sm:text-left">
              We dream to touch everyone’s home and life.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Site Haritası
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Kategoriler
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ünal İSİ İletişim
            </h3>
            <div className="flex justify-center sm:justify-start space-x-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          <p>
            © {currentYear} Tüm Hakları Saklıdır.  |  Developed by{" "}
            <strong>Ünal İSİ</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
