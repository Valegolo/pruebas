import { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Asegúrate de que la ruta sea correcta

// Contexto para los productos
export const ProductsContext = createContext([]);

// Proveedor del contexto de productos
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products')); // Obtenemos la colección de productos desde Firestore
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeamos los documentos
        setProducts(productsArray); // Guardamos los productos en el estado
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts(); // Llamamos a la función de obtención de productos
  }, []);

  return (
    <ProductsContext.Provider value={[products, setProducts]}>
      {children}
    </ProductsContext.Provider>
  );
}
