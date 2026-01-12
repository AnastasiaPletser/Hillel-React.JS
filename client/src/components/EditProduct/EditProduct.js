import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../graphql/mutations";

const EditProduct = ({ product, onUpdated }) => {
  const [editData, setEditData] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || 0,
    year: product.year || null,
    author: product.author || "",
    authorId: product.authorId || null,
    imgUrl: Array.isArray(product.imgUrl) ? product.imgUrl : [product.imgUrl],
  });

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);

  const handleSaveChanges = async () => {
    try {
      console.log("Відправляємо на сервер:", {
        id: product.id,
        input: {
          ...editData,
          price: parseFloat(editData.price) || 0,
          year: parseInt(editData.year) || null,
          imgUrl: editData.imgUrl.filter((url) => url.trim() !== ""),
          authorId: editData.authorId || null,
        },
      });

      const result = await updateProduct({
        variables: {
          id: product.id,
          input: {
            ...editData,
            price: parseFloat(editData.price) || 0,
            year: parseInt(editData.year) || null,
            imgUrl: editData.imgUrl.filter((url) => url.trim() !== ""),
            authorId: editData.authorId || null,
          },
        },
      });

      const updatedProduct = result.data.updateProduct;
      console.log("✅ Оновлено:", updatedProduct);

      if (onUpdated) onUpdated(updatedProduct);
    } catch (err) {
      console.error("Помилка оновлення:", err.message);
      alert("Не вдалось зберегти зміни. Спробуйте ще раз.");
    }
  };

  return (
    <div className="edit-product">
      <h2>Редагувати товар</h2>

      {error && <p style={{ color: "red" }}>❌ {error.message}</p>}

      <input
        type="text"
        placeholder="Назва"
        value={editData.name}
        onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
      />

      <input
        type="text"
        placeholder="Автор"
        value={editData.author}
        onChange={(e) => setEditData((prev) => ({ ...prev, author: e.target.value }))}
      />

      <input
        type="number"
        placeholder="Ціна"
        value={editData.price}
        onChange={(e) => setEditData((prev) => ({ ...prev, price: e.target.value }))}
      />

      <input
        type="number"
        placeholder="Рік видання"
        value={editData.year}
        onChange={(e) => setEditData((prev) => ({ ...prev, year: e.target.value }))}
      />

      <textarea
        placeholder="Опис"
        value={editData.description}
        onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
      />

      {editData.imgUrl.map((url, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Зображення ${index + 1}`}
          value={url || ""}
          onChange={(e) =>
            setEditData((prev) => {
              const newUrls = [...prev.imgUrl];
              newUrls[index] = e.target.value;
              return { ...prev, imgUrl: newUrls };
            })
          }
        />
      ))}

      <button onClick={handleSaveChanges} disabled={loading}>
        {loading ? "Зберігаємо..." : "Зберегти зміни"}
      </button>
    </div>
  );
};

export default EditProduct;
