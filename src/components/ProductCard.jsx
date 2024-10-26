import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <article style={{ border: '2px solid teal', padding: 30 }}>
      <h4>{product.title}</h4>
      <img src={product.image} alt={product.title} />
      <p>$ {product.price}</p>
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-primary">
          <Link to={`/item/${product.id}`}>Details</Link>
        </button>
        {/* Elimina el botón de agregar al carrito */}
      </div>
    </article>
  );
}
