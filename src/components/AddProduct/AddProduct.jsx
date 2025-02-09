import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      category,
      price,
      imgUrl,
      brand,
    };

    const responce = await fetch(
      "https://64b70476df0839c97e165d10.mockapi.io/api/id/products/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    );

    const data = await responce.json();
    console.log(data);
  };

  return (
    <div className="add-product">
      <h1>Додати новий товар</h1>
      <form onSubmit={handleSubmitForm} className="form">
        <input
          type="text"
          placeholder="Назва"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Категорія"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Бренд"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <button type="submit">Додати товар</button>
      </form>
    </div>
  );
};

export default AddProduct;
