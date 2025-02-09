import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import styles from "./Cart.module.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className={styles.cart}>
      <h2>Кошик</h2>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Кошик пустий</p>
      ) : (
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <button className={styles.clearButton} onClick={clearCart}>
            Очистити кошик
          </button>
          <button className={styles.checkoutButton} onClick={() => alert("Замовлення оформлено!")}>
            Оформити замовлення
          </button>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            Повернутися до товарів
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
