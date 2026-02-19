import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../graphql/mutations";
import { GET_PRODUCT } from "../../graphql/query";
import "./editProduct.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const EditProduct = ({ productId, onUpdated, onClose }) => {
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    year: "",
    authorName: "",
    imgUrl: [""],
  });

  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (data?.product) {
      setEditData({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price != null ? data.product.price : "",
        year: data.product.year != null ? data.product.year : "",
        authorName: data.product.authorName || "",
        imgUrl: data.product.imgUrl?.length ? data.product.imgUrl : [""],
      });
    }
  }, [data]);

  if (loadingQuery) return <p>Завантаження...</p>;
  if (errorQuery) return <p className="error">Помилка завантаження товару</p>;

  const handleAddImage = () => {
    setEditData((p) => ({ ...p, imgUrl: [...p.imgUrl, ""] }));
  };

  const handleRemoveImage = (index) => {
    setEditData((p) => {
      const newImgs = p.imgUrl.filter((_, i) => i !== index);
      return { ...p, imgUrl: newImgs.length ? newImgs : [""] };
    });
  };

  const handleChangeImage = (index, value) => {
    setEditData((p) => {
      const imgs = [...p.imgUrl];
      imgs[index] = value;
      return { ...p, imgUrl: imgs };
    });
  };

  const handleSaveChanges = async () => {
    try {
      const images = editData.imgUrl.map((url) => url.trim()).filter(Boolean);

      const input = {
        id: productId,
        name: editData.name,
        description: editData.description || null,
        price: editData.price ? parseFloat(editData.price) : null,
        year: editData.year ? parseInt(editData.year) : null,
        authorName: editData.authorName || null,
        imgUrl: images.length ? images : [NO_IMAGE_PLACEHOLDER],
      };

      const { data } = await updateProduct({ variables: { input } });

      if (data?.updateProduct) {
        onUpdated?.(data.updateProduct);
        onClose?.();
      } else {
        alert("Не вдалося зберегти зміни");
      }
    } catch (err) {
      console.error("Помилка редагування:", err);
      alert("Помилка збереження");
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

      {error && <p className="error">❌ {error.message}</p>}

      <label>Назва</label>
      <input
        type="text"
        placeholder="Назва"
        value={editData.name}
        onChange={(e) => setEditData((p) => ({ ...p, name: e.target.value }))}
      />

      <label>Автор</label>
      <input
        type="text"
        placeholder="Автор"
        value={editData.authorName}
        onChange={(e) =>
          setEditData((p) => ({ ...p, authorName: e.target.value }))
        }
      />

      <label>Ціна, грн</label>
      <input
        type="number"
        placeholder="Ціна"
        value={editData.price}
        onChange={(e) => setEditData((p) => ({ ...p, price: e.target.value }))}
      />

      <label>Рік видання</label>
      <input
        type="number"
        placeholder="Рік видання"
        value={editData.year}
        onChange={(e) => setEditData((p) => ({ ...p, year: e.target.value }))}
      />

      <label>Опис</label>
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
              onChange={(e) => handleChangeImage(index, e.target.value)}
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
            <div className="image-preview">
              <img
                src={url || NO_IMAGE_PLACEHOLDER}
                alt="preview"
                className="product-card__image"
                onError={(e) => {
                  e.target.src = NO_IMAGE_PLACEHOLDER;
                }}
              />
            </div>
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
