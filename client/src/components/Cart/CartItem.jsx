import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./Cart.module.scss";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className={styles.cartItem}>
      <img src={item.imgUrl} alt={item.name} className={styles.itemImage} />
      <div className={styles.itemDetails}>
        <h3>{item.name}</h3>
        <p>Вартість: {item.price * item.quantity}грн.</p>
        <div className={styles.controls}>
          <button onClick={() => decreaseQuantity(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQuantity(item.id)}>+</button>
        </div>
        <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
          Видалити
        </button>
      </div>
    </div>
  );
};

export default CartItem;
