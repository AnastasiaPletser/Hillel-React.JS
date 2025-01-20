import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div>
      <p>{item.name}</p>
      <p>Кількість: {item.quantity}</p>
      <p>Ціна: {item.price * item.quantity}₽</p>
      <button onClick={() => removeFromCart(item.id)}>Видалити</button>
    </div>
  );
};

export default CartItem;
