import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import CartSummary from "../../components/Cart/CartSummary";

import styles from "./Cart.module.scss";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Замовлення оформлено!");
    clearCart();
    navigate("/");
  };

  return (
  <div className={styles.cart}>
    <h2 className={styles.title}>Кошик товарів</h2>

    {cartItems.length === 0 ? (
      <p className={styles.emptyMessage}>Кошик пустий</p>
    ) : (
      <>
        <div className={styles.header}>
          <div>НАЙМЕНУВАННЯ</div>
          <div>КІЛЬКІСТЬ</div>
          <div>ВАРТІСТЬ</div>
          <div></div>
        </div>

        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <CartSummary />

<div className={styles.footer}>
  
        <div className={styles.actions}>        
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Оформити замовлення
          </button>

          <button className={styles.backButton} onClick={() => navigate("/")}>
            Повернутися до товарів
          </button>
        </div>
        </div>
      </>
    )}
  </div>
);
}

export default Cart;

