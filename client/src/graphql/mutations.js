import { useMutation, gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
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

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: ID!) {
    removeProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      id
      name
      description
      price
      year
      authorName
      imgUrl
    }
  }
`;

