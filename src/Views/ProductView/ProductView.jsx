import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../../Context/CartContext'; // Ruta correcta del contexto del carrito

export default function ProductDetail() {
  const [product, setProduct] = useState(null); // Estado para el producto
  const [error, setError] = useState(false); // Estado para manejar error
  const { id } = useParams();
  const [, , addItem] = useContext(CartContext); // Obtiene la función addItem desde el contexto

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id); // Referencia al documento de Firestore
      const productSnap = await getDoc(productRef); // Obtener el documento
      
      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() }); // Guardar el producto en el estado
        setError(false); // No hay error
      } else {
        setError(true); // Producto no existe, establece el error
      }
    };

    fetchProduct();
  }, [id]); // Agregar id a las dependencias para que se ejecute cuando cambie

  const handleAddToCart = () => {
    if (product) {
      addItem(product); // Añade el producto al carrito
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>Advertencia: El producto no existe.</p>; // Mensaje de advertencia
  }

  if (!product) {
    return <p>Cargando...</p>; // Manejo de estado de carga
  }

  return (
    <div className="main-content container-lg" style={{ padding: '40px 0', marginTop: '70px' }}>
      <h2><strong>Detalles del Producto</strong></h2>
      <h5 style={{ padding: 40 }}>{product.title} - {product.category}</h5>
      <img src={product.image} alt={product.title} />
      <p style={{ padding: 40 }}>Caracteristicas: {product.description}</p>
      <p> $ {product.price}</p>
      <button 
  type="button" 
  className="btn btn-outline-primary mx-2 btn-lg" 
  onClick={handleAddToCart}
>
  Comprar
</button>
    </div>
  );
}
