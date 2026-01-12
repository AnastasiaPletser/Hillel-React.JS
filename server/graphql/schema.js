
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type Product {
    id: ID
    name: String!
    description: String
    year: Int
    price: Float!
    author: String
    imgUrl: [String]
   
    authorId: Int
  }

  type Author {
    id: ID
    name: String
  }

  input ProductInput {
    name: String!
    description: String
    price: Float
    year: Int
    author: String
    imgUrl: [String]
    authorId: Int
  }

  type Query {
    getAllProducts(search: String, sort: String, order: String): [Product]       
    getProduct(id: ID!): Product  
    getAuthor: [Author]
  }

  type Mutation  {
    createProduct(input: ProductInput): Product
    uploadImage(file: Upload!): String!
    uploadMultipleImages(files: [Upload!]!): [String!]!
    removeProduct(id: ID!): Boolean
    updateProduct(id: ID!, input: ProductInput!): Product!
  }
`;

