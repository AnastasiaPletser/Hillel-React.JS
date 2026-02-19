import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import "../ProductDetails/ProductDetails.scss";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../../graphql/query.js";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">Помилка завантаження товару</p>;

  const { product } = data;
  if (!product) return <p>Товар не найден</p>;

  const images =
    Array.isArray(product.imgUrl) && product.imgUrl.length > 0
      ? product.imgUrl
      : product.imgUrl
        ? [product.imgUrl]
        : [];

  const handleGoBack = () => navigate(-1);
  const handleThumbnailClick = (index) => setCurrentImageIndex(index);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="book-page">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Повернутись до товарів
      </button>

      <div className="book-hero">
        <div className="product-gallery">
          <div className="thumbnail-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          <div className="main-image-container">
            <button className="nav-button left" onClick={handlePrevImage}>
              ❮
            </button>

            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="product-details__image"
            />

            <button className="nav-button right" onClick={handleNextImage}>
              ❯
            </button>
          </div>
        </div>

        <div className="book-info">
          <h1 className="title">{product.name}</h1>

          <div className="author">Автор: {product.authorName}</div>
          <div className="year">Рік видання: {product.year}</div>

          <div className="price">Ціна {product.price} грн</div>

          <button className="buy" onClick={() => addToCart(product)}>
            Додати у кошик
          </button>

          <div className="advantages">
            <div>✔ Є в наявності</div>
            <div>✔ Відправка сьогодні</div>
            <div>✔ Оплата при отриманні</div>
          </div>
        </div>
      </div>

      <div className="book-description">
        <h2>Анотація</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
