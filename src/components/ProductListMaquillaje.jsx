import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase.js'; // Asegúrate de que la ruta sea correcta
import { collection, query, where, getDocs } from 'firebase/firestore';
import ProductCard from './ProductCard.jsx';

export default function ProductsListMaquillaje() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Cambia 'products' al nombre de tu colección
        const q = query(productsCollection, where('category', 'in', ['Sombras', 'Contorno de Rostro', 'Labial'])); // Filtra por categorías
        const snapshot = await getDocs(q);
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList); // Establece los productos filtrados
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
