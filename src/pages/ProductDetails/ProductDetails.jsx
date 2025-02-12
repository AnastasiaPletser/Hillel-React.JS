import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import "../ProductDetails/ProductDetails.scss";

export default function ProductDetails() {
  const { name, description, category, price, brand, id } = useParams(); // Получаем ID товара из URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://64b70476df0839c97e165d10.mockapi.io/api/id/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Помилка завантаження товару");
        }
        const data = await response.json();

        const backupImages = [
          "https://blog.yakaboo.ua/wp-content/uploads/2019/08/exeter-book.jpg",
          "https://huss.com.ua/wp-content/uploads/2024/09/alexander-grey-eMP4sYPJ9x0-unsplash.jpg",
        ];

        const images =
          data.images && data.images.length > 0
            ? data.images
            : [data.imgUrl, ...backupImages];

        setProduct({ ...data, images });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Товар не найден</p>;

  return (
    <div className="product-details">
      <button className="go-back-button" onClick={handleGoBack}>
        ← Повернутись до товарів
      </button>
      <br></br>

      <div className="product-gallery">
        <div className="thumbnail-container">
          {product.images.map((image, index) => (
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
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="product-details__image"
          />
          <button className="nav-button right" onClick={handleNextImage}>
            ❯
          </button>
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p>Автор: {product.brand}</p>
        <p>Рік видання: {product.category}</p>
        <p>Опис: {product.description}</p>
        
        {/* <h6>Ціна: {product.price} грн</h6> */}

        <p className="product-details__description">{product.description}</p>
        <p className="product-details__price">{product.price} грн.</p>
        <button className="buy-button" onClick={() => addToCart(product)}>
          Додати у кошик
        </button>
      </div>
    </div>
  );
}
