import ProductListCabello from '../components/ProductListCabello';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { collection, getDocs } from 'firebase/firestore';

export default function SkincareView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Cambia 'products' al nombre de tu colección
        const snapshot = await getDocs(productsCollection); // Obtener todos los productos
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList); // Guardar todos los productos en el estado
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []); // Solo se ejecuta al montar el componente

  return (
    <>
      <h2 className="text-center" style={{ marginTop: '40px' }}>
        <strong>Nuestros Productos</strong>
      </h2>
      <div className="main-content container-lg" style={{ padding: '10px 0', marginTop: '10px' }}>
        <ProductListCabello products={products} />
      </div>
    </>
  );
}
