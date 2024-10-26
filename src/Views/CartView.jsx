import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function CartView() {
  const { cart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  // Verifica si hay elementos en el carrito
  if (cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div className="cart-view">
      <h2>Tu Carrito</h2>
      <ul className="list-group">
        {cart.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={product.image} alt={product.title} style={{ width: '50px', marginRight: '10px' }} />
              <span>{product.title}</span>
              <span className="mx-2">- Precio: ${product.price}</span>
              <span>- Cantidad: {product.quantity}</span>
              <span> - Total: ${product.price * product.quantity}</span>
            </div>
            <div>
              <button 
                className="btn btn-outline-primary mx-1" 
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </button>
              <button 
                className="btn btn-outline-danger mx-1" 
                onClick={() => decreaseQuantity(product.id)}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
      <button onClick={clearCart} className="btn btn-danger">Vaciar Carrito</button>
      <button className="btn btn-success" style={{ marginLeft: '10px' }}>Proceder a la Compra</button>
    </div>
  );
}
