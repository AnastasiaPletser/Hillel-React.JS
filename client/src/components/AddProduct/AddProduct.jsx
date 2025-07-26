import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [isAdded, setIsAdded] = useState(false); 
  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setDescription("");
    setYear("");
    setPrice("");
    setAuthor("");
    setImgUrl("");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      year,
      price,
      imgUrl,
      author,
    };

    try {
      const response = await fetch(
        "https://64b70476df0839c97e165d10.mockapi.io/api/id/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      const data = await response.json();
      console.log("Товар добавлен:", data);
      setIsAdded(true); 
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  return (
    <div className="add-product">
      <h1>Додати новий товар</h1>

      {!isAdded ? (
        <form onSubmit={handleSubmitForm} className="form">
          <input
            type="text"
            placeholder="Назва"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            required
          />
          <input
            type="number"
            placeholder="Рік видання"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Ціна"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="ImgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            
          />

          <button type="submit">Додати товар</button>
        </form>
      ) : (
        <div className="after-submit">
          <p>✅ Товар успішно додано!</p>
          <button
            onClick={() => {
              resetForm();
              setIsAdded(false);
            }}
          >
            Додати ще
          </button>
          <button onClick={() => navigate("/")}>Повернутися на головну</button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

