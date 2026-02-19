import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($search: String, $sort: String, $order: String) {
    products: getAllProducts(search: $search, sort: $sort, order: $order) {
      id
      name
      price
      authorName
      imgUrl
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
    }
  }
`;

export const GET_SEARCH_PRODUCTS = gql`
  query GetSearchProducts($name: String) {
    searchProducts: getSearchProducts(name: $name) {
        id
        name
        imgUrl
    }
  }
`;
