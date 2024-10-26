import { useParams } from 'react-router-dom';
import ProductsListSkincare from '../components/ProductsListSkincare'; // Asegúrate de que esta ruta sea correcta
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function SkincareView() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams(); // Obtener categoryId de la ruta

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where('category', '==', categoryId)); // Filtrar productos por categoría
        const snapshot = await getDocs(q);
        
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList); // Establecer productos en el estado
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]); // Volver a ejecutar cuando cambie categoryId

  return (
    <>
      <h2 className="text-center" style={{ marginTop: '40px' }}>
        <strong>{`Productos de: ${categoryId}`}</strong>
      </h2>
      <div className="main-content container-lg" style={{ padding: '10px 0', marginTop: '10px' }}>
        <ProductsListSkincare products={products} /> {/* Pasar los productos a ProductsList */}
      </div>
    </>
  );
}
