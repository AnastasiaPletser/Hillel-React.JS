import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./Cart.module.scss";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  return (
    <div className={styles.row}>
      
      <div className={styles.product}>
        <img src={item.imgUrl} alt={item.name} />
        <span>{item.name}</span>
      </div>

      <div className={styles.quantity}>
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
      </div>

      <div className={styles.price}>
        {item.price * item.quantity} грн
      </div>

      <button
        className={styles.remove}
        onClick={() => removeFromCart(item.id)}
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;

