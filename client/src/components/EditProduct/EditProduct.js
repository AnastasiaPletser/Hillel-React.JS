import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { UPDATE_PRODUCT } from "../../graphql/mutations";
import { GET_PRODUCT } from "../../graphql/query";
import ProductForm from "../../components/ProductForm/ProductForm";
import "./editProduct.scss";

const NO_IMAGE_PLACEHOLDER = "/images/no-image.png";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    year: "",
    authorName: "",
    imgUrls: [""],
  });

  const {
    loading: loadingQuery,
    error: errorQuery,
    data,
  } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const [updateProduct, { loading, error }] =
    useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (data?.product) {
      setFormData({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price ?? "",
        year: data.product.year ?? "",
        authorName: data.product.authorName || "",
        imgUrls:
          data.product.imgUrl?.length
            ? data.product.imgUrl
            : [""],
      });
    }
  }, [data]);

  if (loadingQuery) return <p>Завантаження...</p>;
  if (errorQuery)
    return <p className="error">Помилка завантаження товару</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const images = formData.imgUrls
        .map((url) => url.trim())
        .filter(Boolean);

      const input = {
        id,
        name: formData.name,
        description: formData.description || null,
        price: formData.price
          ? parseFloat(formData.price)
          : null,
        year: formData.year
          ? parseInt(formData.year)
          : null,
        authorName: formData.authorName || null,
        imgUrl: images.length
          ? images
          : [NO_IMAGE_PLACEHOLDER],
      };

      const { data } = await updateProduct({
        variables: { input },
      });

      if (data?.updateProduct) {
        navigate(-1);
      } else {
        alert("Не вдалося зберегти зміни");
      }
    } catch (err) {
      console.error("Помилка редагування:", err);
      alert("Помилка збереження");
    }
  };

  return (
    <div className="edit-product-page">
      <ProductForm
        title="Редагувати товар"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitText="Зберегти зміни"
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default EditProduct;
