import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import ProductList from "../../components/Product/ProductList";

import EditProduct from "../../components/EditProduct/EditProduct";
import { GET_ALL_PRODUCTS } from "../../graphql/query.js";

const Admin = () => {
  const [editingProduct, setEditingProduct] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { products = [] } = data;

  return (
    <Container className="d-flex flex-column">
      {editingProduct ? (
        <EditProduct
          product={editingProduct}
          onUpdated={() => {
            setEditingProduct(null);
            refetch();
          }}
        />
      ) : (
        <>
          <ProductList products={products} />
        </>
      )}
    </Container>
  );
};

export default Admin;
