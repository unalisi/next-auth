import Card from '../components/Card';
import data from '@/data/products.json';
import { Product } from '@/lib/types';

const AllProducts = () => {
  const products: Product[] = data.products;

  return (
    <section id='allproducts' className='container mx-auto py-8'>
      <h2 className="text-3xl font-bold text-center mb-8">Tüm Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;