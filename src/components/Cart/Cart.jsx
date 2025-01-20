import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  return (
    <div>
      <h2>Кошик</h2>
      {cartItems.length === 0 ? (
        <p>Кошик пустий</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <button onClick={clearCart}>Очистити кошик</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
