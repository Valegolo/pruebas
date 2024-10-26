import { useContext } from 'react';
import { ProductsContext } from '../Context/ProductsData';
import ItemCard from './ProductCard';
import ProductCard from './ProductCard';

export default function Items() {
  const [products] = useContext(ProductsContext);

  return (
    <>
      <section>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
