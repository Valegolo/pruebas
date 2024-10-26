import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard.jsx';

export default function ProductsListSkincare() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Filtra la colección por la categoría 'Skincare'
        const productsCollection = collection(db, 'products');
        const skincareQuery = query(productsCollection, where('category', '==', ''));
        const snapshot = await getDocs(skincareQuery);
        
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProducts(productsList); // Establece solo productos de Skincare
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
