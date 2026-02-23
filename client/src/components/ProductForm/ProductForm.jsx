import React from "react";
import "./productForm.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const ProductForm = ({
  title,
  formData,
  setFormData,
  onSubmit,
  loading,
  error,
  onCancel,
  submitText = "Зберегти"
}) => {

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImgChange = (index, value) => {
    const newImgs = [...formData.imgUrls];
    newImgs[index] = value;

    setFormData(prev => ({
      ...prev,
      imgUrls: newImgs
    }));
  };

  const handleRemoveImg = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imgUrls: prev.imgUrls.filter((_, i) => i !== indexToRemove)
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      imgUrls: [...prev.imgUrls, ""]
    }));
  };

  return (
    <form onSubmit={onSubmit} className="form">
      {onCancel && (
        <button type="button" className="go-back" onClick={onCancel}>
          ✕
        </button>
      )}

      <h1 className="addNewProduct">{title}</h1>

      {error && <p className="error">❌ {error.message}</p>}

      <label>Назва</label>
      <input
        type="text"
        value={formData.name}
        maxLength={50}
        onChange={(e) => handleChange("name", e.target.value)}
        required
      />

      <label>Автор</label>
      <input
        type="text"
        value={formData.authorName}
        onChange={(e) => handleChange("authorName", e.target.value)}
      />

      <label>Ціна</label>
      <input
        type="number"
        value={formData.price}
        onChange={(e) => handleChange("price", e.target.value)}
        required
      />

      <label>Рік</label>
      <input
        type="number"
        value={formData.year}
        onChange={(e) => handleChange("year", e.target.value)}
      />

      <label>Опис</label>
      <textarea
        value={formData.description}
        maxLength={2000}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <div className="images-inputs">
        {formData.imgUrls.map((url, index) => (
          <div key={index} className="image-input">
            <div className="image-input__field">
              <input
                type="text"
                value={url}
                placeholder={`Зображення ${index + 1}`}
                onChange={(e) => handleImgChange(index, e.target.value)}
              />

              {formData.imgUrls.length > 1 && (
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => handleRemoveImg(index)}
                >
                  ✕
                </button>
              )}
            </div>

            <img
              src={url || NO_IMAGE_PLACEHOLDER}
              alt="preview"
              className="product-card__image"
              onError={(e) => {
                e.target.src = NO_IMAGE_PLACEHOLDER;
              }}
            />
          </div>
        ))}

        <button type="button" onClick={addImageField}>
          + Додати ще картинку
        </button>
      </div>

      <button type="submit" disabled={loading} className="buttonAddProduct">
        {loading ? "Зберігаємо..." : submitText}
      </button>
    </form>
  );
};

export default ProductForm;
