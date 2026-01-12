import React, { useState } from "react";

export default function AddProduct2({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    price: "",
    imgUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Name and price are required!");
      return;
    }
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h3>Додати товар</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Назва"
        maxLength={50}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Опис"
        maxLength={200}
      />
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Рік"
        maxLength={50}
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Автор"
        maxLength={50}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Ціна"
        min="0"
        step="0.01"
        required
      />
      <input
        type="text"
        name="imgUrl"
        value={formData.imgUrl}
        onChange={handleChange}
        placeholder="Посилання на картинку"
      />
      <button type="submit">Додати</button>
      <button type="button" onClick={onCancel}>
        Відхилити
      </button>
    </form>
  );
}
