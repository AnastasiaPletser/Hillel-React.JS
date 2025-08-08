import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Upload

  type Product {
    id: ID
    name: String!
    description: String
    price: Float
    imgUrl: [String]
    year: Int
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
    imgUrl: [String]!
    year: Int
    authorId: Int
  }

  type Query {
    getAllProducts: [Product]       
    getProduct(id: ID!): Product  
    getAuthor: [Author]
  }

  type Mutation  {
    createProduct(input: ProductInput): Product
    uploadImage(file: Upload!): String!
    uploadMultipleImages(files: [Upload!]!): [String!]!
  }
`;
