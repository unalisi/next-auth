import Card from "../../../components/Card";
import data from "@/data/products.json";
import { Product } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";

// Bu fonksiyon, URL'deki slug ile eşleşen ürünleri bulur.
const getProductsByCategory = (
  categorySlug: string
): { products: Product[]; categoryName: string | null } => {
  let categoryName: string | null = null;

  const filteredProducts = data.products.filter((product) => {
    const currentCategorySlug = slugify(product.category);
    if (currentCategorySlug === categorySlug) {
      if (!categoryName) {
        // Eşleşen ilk üründen kategori adını çek
        categoryName = product.category;
      }
      return true;
    }
    return false;
  });

  return { products: filteredProducts, categoryName };
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { products, categoryName } = getProductsByCategory(params.slug);

  // Eğer kategoriye ait ürün yoksa veya kategori mevcut değilse 404 dön
  if (!categoryName || products.length === 0) {
    notFound();
  }

  return (
    <section className="container mx-auto my-8">
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500">Kategori</p>
        <h1 className="text-4xl font-bold text-gray-800">{categoryName}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
