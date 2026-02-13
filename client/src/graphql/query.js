import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($search: String, $sort: String, $order: String) {
    products: getAllProducts(search: $search, sort: $sort, order: $order) {
      id
      name
      description
      year
      price
      authorName
      imgUrl
      authorId
    }
  }
`;
export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product: getProduct(id: $id) {
      id
      name
      description
      year
      price
      authorName
      imgUrl
      authorId
    }
  }
`;

export const GET_PRODUCT_WITH_AUTHOR = gql`
  query GetProductWithAuthor($id: ID!) {
    product: getProductWithAuthor(id: $id) {
      id
      name
      description
      year
      price
      authorName
      imgUrl
      authorId
    }
authorName
  }
`;
