import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../graphql/mutations";
import "./editProduct.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const EditProduct = ({ product, onUpdated, onClose }) => {
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    year: "",
    author: "",
    // authorId: "",
    imgUrl: [""],
  });

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (!product) return;

    setEditData({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      year: product.year ?? "",
      author: product.author ?? "",
      // authorId: product.authorId ?? "",
      imgUrl: Array.isArray(product.imgUrl)
        ? product.imgUrl
        : product.imgUrl
        ? [product.imgUrl]
        : [""],
    });
  }, [product]);

  if (!product) {
    return <p>Завантаження...</p>;
  }

  const handleAddImage = () => {
    setEditData((p) => ({
      ...p,
      imgUrl: [...p.imgUrl, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    setEditData((p) => ({
      ...p,
      imgUrl: p.imgUrl.filter((_, i) => i !== index),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const images = editData.imgUrl
        .map((url) => url.trim())
        .filter(Boolean);

      const input = {
        name: editData.name,
        description: editData.description || null,
        price: Number(editData.price) || 0,
        year:
          editData.year === "" || editData.year === null
            ? null
            : Number(editData.year),
        author: editData.author || null,
        // authorId: editData.authorId || null,
        imgUrl: images.length ? images : [NO_IMAGE_PLACEHOLDER],
      };

      const result = await updateProduct({
        variables: { id: product.id, input },
      });

      if (!result?.data?.updateProduct) {
        console.error("Update failed, server returned no data:", result);
        alert(
          "Не вдалось зберегти зміни. Сервер не відповів або продукт не знайдено."
        );
        return;
      }

      const updatedProduct = result.data.updateProduct;
      console.log("✅ Оновлено:", updatedProduct);

      onUpdated?.(updatedProduct);
    } catch (err) {
      console.error("Помилка оновлення:", err);
      alert("Не вдалось зберегти зміни. Перевірте дані або спробуйте ще раз.");
    }
  };

  return (
    <div className="edit-product">

      <button
        type="button"
        className="close-button"
        onClick={onClose}
        disabled={loading}
      >
        ✕
      </button>

      <h2>Редагувати товар</h2>

      {error && <p className="error">❌ {error.message || "Помилка сервера"}</p>}

      <input
        type="text"
        placeholder="Назва"
        value={editData.name}
        onChange={(e) =>
          setEditData((p) => ({ ...p, name: e.target.value }))
        }
      />

      <input
        type="text"
        placeholder="Автор"
        value={editData.authorId}
        // value={editData.author}
        onChange={(e) =>
          setEditData((p) => ({ ...p, author: e.target.value }))
        }
      />

      <input
        type="number"
        placeholder="Ціна"
        value={editData.price}
        onChange={(e) =>
          setEditData((p) => ({ ...p, price: e.target.value }))
        }
      />

      <input
        type="number"
        placeholder="Рік видання"
        value={editData.year}
        onChange={(e) =>
          setEditData((p) => ({ ...p, year: e.target.value }))
        }
      />

      <textarea
        placeholder="Опис"
        value={editData.description}
        onChange={(e) =>
          setEditData((p) => ({ ...p, description: e.target.value }))
        }
      />

      <div className="images">
        {editData.imgUrl.map((url, index) => (
          <div key={index} className="image-row">
            <input
              type="text"
              placeholder={`Зображення ${index + 1}`}
              value={url}
              onChange={(e) =>
                setEditData((p) => {
                  const imgs = [...p.imgUrl];
                  imgs[index] = e.target.value;
                  return { ...p, imgUrl: imgs };
                })
              }
            />
            {editData.imgUrl.length > 1 && (
              <button
                type="button"
                className="remove-image"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-image" onClick={handleAddImage}>
          + Додати зображення
        </button>
      </div>

      <button onClick={handleSaveChanges} disabled={loading}>
        {loading ? "Зберігаємо..." : "Зберегти зміни"}
      </button>
    </div>
  );
};

export default EditProduct;

