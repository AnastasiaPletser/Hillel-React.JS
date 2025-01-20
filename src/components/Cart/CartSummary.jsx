import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h3>Усього: {total}₽</h3>
    </div>
  );
};

export default CartSummary;
