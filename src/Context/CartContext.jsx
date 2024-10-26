import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((prod) => prod.id === item.id);
      if (existingItem) {
        return prev.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const existingItem = prev.find((prod) => prod.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prev.map((prod) =>
            prod.id === id
              ? { ...prod, quantity: prod.quantity - 1 }
              : prod
          );
        }
        return prev.filter((prod) => prod.id !== id);
      }
      return prev;
    });
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
