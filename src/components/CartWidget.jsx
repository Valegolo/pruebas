import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

export default function CartWidget() {
  const { totalQuantity } = useContext(CartContext); // Obtener la cantidad total del carrito

  return (
    <Link to='/cart'> {/* Redirige a la página del carrito */}
      <button type="button" className="btn btn-outline-primary mx-2 btn-lg">
        🛒 {totalQuantity > 0 ? totalQuantity : 0}
      </button>
    </Link>
  );
}
