import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function CartView() {
  const { cart, clearCart, totalAmount } = useContext(CartContext);

  // Verifica si hay elementos en el carrito
  if (cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div className="cart-view">
      <h2>Tu Carrito</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            <img src={product.image} alt={product.title} style={{ width: '50px', marginRight: '10px' }} />
            <span>{product.title}</span>
            <span> - Cantidad: {product.quantity}</span>
            <span> - Precio: ${product.price}</span>
            <span> - Total: ${product.price * product.quantity}</span>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalAmount()}</h3>
      <button onClick={clearCart} className="btn btn-danger">Vaciar Carrito</button>
      <button className="btn btn-success" style={{ marginLeft: '10px' }}>Proceder a la Compra</button>
    </div>
  );
}
