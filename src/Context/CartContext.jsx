import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const existingProduct = cart.find((cartItem) => cartItem.id === item.id);
    if (existingProduct) {
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const itemToDecrease = prev.find((item) => item.id === id);
      if (itemToDecrease.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]); // Vaciar el carrito
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0); // Total de artículos en el carrito

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
