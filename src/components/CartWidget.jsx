import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

export default function CartWidget() {
  const [cart] = useContext(CartContext);

  return (
    <>
      <button type="button" class="btn btn-outline-primary mx-2 btn-lg">🛒</button>
      <p>{cart.length}</p>
    </>
  );
}