import React, { useState } from 'react';

const QuantitySelector = ({ onAdd, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Evita que la cantidad sea menor que 1
  };

  const handleAddToCart = () => {
    onAdd(quantity); // Llama a la función onAdd con la cantidad actual
  };

  return (
    <div className="quantity-selector">
      <button onClick={handleDecrease} className="btn btn-outline-secondary">-</button>
      <span style={{ margin: '0 10px' }}>{quantity}</span>
      <button onClick={handleIncrease} className="btn btn-outline-secondary">+</button>
      <button 
        type="button" 
        className="btn btn-outline-primary mx-2 btn-lg" 
        onClick={handleAddToCart}
      >
        Comprar
      </button>
    </div>
  );
};

export default QuantitySelector;
