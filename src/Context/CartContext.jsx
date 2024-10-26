import {createContext, useState} from 'react';

export const CartContext=createContext(false);

export function CartProvider({children}){

  const [cart, setCart]=useState([]);

  const addItem = (item) => {
    //agregamos productos al carro
    setCart([...cart, item]);
  }

  //removeItem, clearCart, isInCart

  return (
  <CartContext.Provider value={[cart, setCart, addItem]}>
    {children}
  </CartContext.Provider>
  )
}