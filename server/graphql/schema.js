import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Upload

  type Product {
    id: ID
    name: String
    description: String
    year: Int
    price: Float
    authorName: String
    imgUrl: [String]
  }

  input ProductInput {
    id: ID
    name: String
    description: String
    price: Float
    year: Int
    authorName: String
    imgUrl: [String]
  }

  type Query {
    getAllProducts(search: String, sort: String, order: String): [Product]
    getProduct(id: ID!): Product
    getSearchProducts(name: String): [Product]
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(input: ProductInput): Product
    removeProduct(id: ID!): Boolean
    uploadImage(file: Upload!): String!
    uploadMultipleImages(files: [Upload!]!): [String!]!
  }
`;
