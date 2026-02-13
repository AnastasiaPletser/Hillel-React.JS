import React, { useContext } from "react";
import { FavoriteContext } from "../../context/FavoriteContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./Favorite.module.scss";

const Favorite = () => {
  const { favoriteItems, removeFromFavorite, clearFavorite } =
    useContext(FavoriteContext);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const addAllToCart = () => {
    favoriteItems.forEach(item => addToCart(item));

    clearFavorite(); 
navigate("/cart");
    alert("Всі товари додані у кошик");
  };

  return (
    <div className={styles.favorite}>
      <h2 className={styles.title}>Обране</h2>

      {favoriteItems.length === 0 ? (
        <p className={styles.emptyMessage}>Список обраного порожній</p>
      ) : (
        <>
          <div className={styles.header}>
            <div>НАЙМЕНУВАННЯ</div>
            <div>ВАРТІСТЬ</div>
            <div></div>
          </div>

          <div className={styles.items}>
            {favoriteItems.map((item) => (
              <div key={item.id} className={styles.row}>
                <div className={styles.product}>
                  <img src={item.imgUrl} alt={item.name} />
                  <span>{item.name}</span>
                </div>

                <div className={styles.price}>
                  {item.price} грн
                </div>

                <button
                  className={styles.remove}
                  onClick={() => removeFromFavorite(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.actions}>
              <button className={styles.addAllButton} onClick={addAllToCart}>
                Додати все в кошик
              </button>

              <button
                className={styles.backButton}
                onClick={() => navigate("/")}
              >
                Продовжити покупки
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorite;
