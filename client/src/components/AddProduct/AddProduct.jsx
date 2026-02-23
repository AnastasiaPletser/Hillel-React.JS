import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../graphql/mutations";
import OrderSuccessModal from "../../components/OrderSuccessModal/OrderSuccessModal";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./addProduct.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    year: "",
    price: "",
    authorName: "",
    imgUrls: [""]
  });

  const [isAdded, setIsAdded] = useState(false);

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const images = formData.imgUrls
        .map((url) => url.trim())
        .filter(Boolean);

      const input = {
        name: formData.name,
        price: parseFloat(formData.price),
        ...(formData.description && { description: formData.description }),
        ...(formData.year && { year: parseInt(formData.year) }),
        ...(formData.authorName && { authorName: formData.authorName }),
        imgUrl: images.length ? images : [NO_IMAGE_PLACEHOLDER],
      };

      await createProduct({ variables: { input } });
      setIsAdded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      year: "",
      price: "",
      authorName: "",
      imgUrls: [""]
    });
  };

  return (
    <div className="add-product">
      <ProductForm
        title="Додати новий товар"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        onCancel={() => navigate(-1)}
        submitText="Додати товар"
      />

      <OrderSuccessModal
        open={isAdded}
        onClose={() => {
          resetForm();
          setIsAdded(false);
        }}
        title="Товар успішно додано!"
        message="Ви можете додати ще один товар або повернутися на головну"
      />
    </div>
  );
};

export default AddProduct;
