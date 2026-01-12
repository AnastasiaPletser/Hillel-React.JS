import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import "../ProductDetails/ProductDetails.scss";
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from "../../graphql/query.js";

export default function ProductDetails() {
  // const { name, description, year, price, author, id } = useParams(); // Получаем ID товара из URL
  const navigate = useNavigate();
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {id} = useParams();

   const {loading, error, data} = useQuery(GET_PRODUCT, {
    variables: {
      id: id 
    }
   })

   
  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error... :</p>;
    
    const {product = []} = data
    //  const { product } = data || {};
console.log("88888888", product)


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

      {/* <div className="product-gallery">
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
      </div> */}

      <div className="product-info">
        <h1>{product.name}</h1>
        <p>Автор: {product.author}</p>
        <p>Рік видання: {product.year}</p>
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
