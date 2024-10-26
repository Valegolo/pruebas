import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Si no está, agregar el producto con cantidad 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]); // Vaciar el carrito

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0); // Total de artículos en el carrito

  const totalAmount = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Sumar el total
  };

  return (
    <CartContext.Provider value={{ cart, addItem, clearCart, totalQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
