import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FavoriteContext } from "../../context/FavoriteContext";
import { Context } from "../../index";
import { PRODUCT_DETAILS_ROUTE } from "../../utils/consts";
import "./Product.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const Product = ({ product }) => {
  const { name, price, authorName} = product;
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoriteContext);
  const { user } = useContext(Context);

  const liked = isFavorite(product.id);

  const handleLike = () => {
    toggleFavorite(product);
  };

  const imageSrc =
    product?.imgUrl && product.imgUrl.length > 0
      ? product.imgUrl[0]
      : NO_IMAGE_PLACEHOLDER;

  const canBuy = !user.isAdmin;
  const canLike = user.isAuth && !user.isAdmin;

  return (
    <div className="product-card">
      <div className="product-content">

        {canLike && (
          <div
            className={`heart ${liked ? "active" : ""}`}
            onClick={handleLike}
          >
            <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"} fs-4`}></i>
          </div>
        )}

        <a
          href={PRODUCT_DETAILS_ROUTE + "/" + product.id}
          className="products__image"
        >
          <img
            src={imageSrc}
            alt={name}
            className="product-card__image"
            onError={(e) => (e.target.src = NO_IMAGE_PLACEHOLDER)}
          />
        </a>

        <div className="product-info">
          <h4 className="bookName">{name}</h4>
          <h6 className="author">Автор: {authorName}</h6>
          <h6 className="price">Ціна: {price} грн.</h6>
        </div>

        {canBuy && (
          <div className="product-buttons">
            <button
              className="add-cart-btn"
              onClick={() => addToCart(product)}
            >
              🛒 В кошик
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Product;
