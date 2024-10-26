import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function ProductCard({ product }) {
  const { addItem, removeItem } = useContext(CartContext);

  const handleAddToCart = () => {
    addItem(product); // Añade el producto al carrito
  };

  const handleRemoveFromCart = () => {
    removeItem(product.id); // Elimina uno del producto en el carrito
  };

  return (
    <article style={{ border: '2px solid teal', padding: 30 }}>
      <h4>{product.title}</h4>
      <img src={product.image} alt={product.title} />
      <p>$ {product.price}</p>
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary mx-2">
          <Link to={`/item/${product.id}`}>Detalles</Link>
        </button>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary mx-2"
            onClick={handleAddToCart}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-outline-danger mx-2"
            onClick={handleRemoveFromCart}
          >
            -
          </button>
        </div>
      </div>
    </article>
  );
}
