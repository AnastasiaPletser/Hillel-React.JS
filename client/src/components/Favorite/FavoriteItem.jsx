import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./Favorite.module.scss";

const FavoriteItem = ({ item }) => {
  const { removeFromCart, addToCart } = useContext(CartContext);

  return (
    <div className={styles.row}>
      
      <div className={styles.product}>
        <img src={item.imgUrl} alt={item.name} />
        <span>{item.name}</span>
      </div>

      <div className={styles.price}>
        {item.price} грн
      </div>

      <div className={styles.actions}>
        <button
          className={styles.toCart}
          onClick={() => addToCart(item)}
        >
          В кошик
        </button>

        <button
          className={styles.remove}
          onClick={() => removeFromCart(item.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FavoriteItem;
