import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase.js'; // Asegúrate de que la ruta sea correcta
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard.jsx';

export default function ProductsListHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Cambia 'products' al nombre de tu colección
        const snapshot = await getDocs(productsCollection);
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList); // Sin Filtro, se obtienen todos los productos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="main-content container-lg" style={{ padding: '40px 0', marginTop: '70px' }}>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

