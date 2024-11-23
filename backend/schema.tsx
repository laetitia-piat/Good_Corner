import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Ad {
    category: Category
    createdAt: String!
    description: String!
    email: String!
    id: Float!
    location: String!
    owner: String!
    pictures: [Picture!]!
    price: Float!
    tags: [Tag!]!
    title: String!
  }

  input AdInput {
    category: ID
    createdAt: String!
    description: String!
    email: String!
    location: String!
    owner: String!
    pictures: [PictureInput!]
    price: Float!
    tags: [TagInput!]
    title: String!
  }

  type Category {
    id: Float!
    name: String!
  }

  input CategoryInput {
    name: String!
  }

  type Mutation {
    createNewAd(data: AdInput!): Ad!
    createNewCategory(data: CategoryInput!): Category!
    deleteAdById(id: Float!): String!
    deleteCategory(id: Float!): String!
    deleteTag(id: Float!): String!
    updateAd(data: UpdateAdInput!): String!
    updateCategory(data: UpdateCategoryInput!): String!
    updateTag(data: UpdateTagInput!): String!
  }

  type Picture {
    id: Float!
    url: String!
  }

  input PictureInput {
    url: String!
  }

  type Query {
    getAdById(id: Float!): Ad!
    getAdsByCategory(categoryName: String!): [Ad!]!
    getAdsByKeyWord(title: String): [Ad!]!
    getAllAds: [Ad!]!
    getAllCategories: [Category!]!
    getAllTags: [Tag!]!
    getCategoryById(id: Float!): Category!
    getTagById(id: Float!): Tag!
  }

  type Tag {
    id: Float!
    name: String!
  }

  input TagInput {
    id: Float
  }

  input UpdateAdInput {
    category: ID
    createdAt: String
    description: String
    email: String
    id: Float!
    location: String
    owner: String
    pictures: [PictureInput!]
    price: Float
    tags: [TagInput!]
    title: String
  }

  input UpdateCategoryInput {
    id: Float!
    name: String!
  }

  input UpdateTagInput {
    id: Float!
    name: String!
  }
`;