import Image from "next/image";
import { notFound } from "next/navigation";
import data from "@/data/products.json";
import { Product } from "@/lib/types";
import AddToCartButton from "../../../components/AddToCartButton";

// Ürün verisini ID'ye göre getiren fonksiyon
const getProductBySlug = (slug: string): Product | undefined => {
  const productId = parseInt(slug.split("-")[0], 10);
  if (isNaN(productId)) {
    return undefined;
  }
  return data.products.find((p) => p.id === productId);
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Ürün bulunamazsa 404 dön
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Görsel Galerisi */}
      <div className="relative h-[500px]">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-gray-500 mb-2">
          {product.category}
        </span>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {product.title}
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
        <div className="text-4xl font-extrabold text-blue-600 mb-6">
          {product.price.toFixed(2)} TL
        </div>
        <div className="w-full sm:w-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
