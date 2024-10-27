import { useParams } from 'react-router-dom'; 
import { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { addItem, decreaseQuantity, cart } = useContext(CartContext);

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

  const handleRemoveFromCart = () => {
    if (product) {
      decreaseQuantity(product.id); // Cambiar a decreaseQuantity
    }
  };

  const existingProduct = cart.find((item) => item.id === product?.id);
  const quantityInCart = existingProduct ? existingProduct.quantity : 0;

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
      
      {/* Botones para aumentar y disminuir la cantidad */}
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-outline-danger mx-2" 
            onClick={handleRemoveFromCart}
            disabled={quantityInCart === 0}
          >
            -
          </button>
          <span>En Carrito: {quantityInCart}</span>
          <button 
            className="btn btn-outline-primary mx-2" 
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
