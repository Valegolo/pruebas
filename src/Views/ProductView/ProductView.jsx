import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase/firebase'; // Asegúrate de que la ruta sea correcta
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../../Context/CartContext'; // Asegúrate de la ruta correcta

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { addItem } = useContext(CartContext); // Asegúrate de que estás accediendo correctamente

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() });
        setError(false);
      } else {
        setError(true);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>Advertencia: El producto no existe.</p>;
  }

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="main-content container-lg" style={{ padding: '40px 0', marginTop: '70px' }}>
      <h2><strong>Detalles del Producto</strong></h2>
      <h5 style={{ padding: 40 }}>{product.title} - {product.category}</h5>
      <img src={product.image} alt={product.title} />
      <p style={{ padding: 40 }}>Características: {product.description}</p>
      <p>$ {product.price}</p>
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
