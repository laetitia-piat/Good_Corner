import { gql } from "@apollo/client";

export const byCategory = gql`
  query getAdsByCategory($categoryName: String!) {
    getAdsByCategory(categoryName: $categoryName) {
      id
      title
      description
      owner
      email
      price
      location
      createdAt
      category {
        id
        name
      }
      pictures {
        url
      }
      tags {
        id
        name
      }
    }
  }
`;

export const allCategory = gql`
  query getAllCategory {
    getAllCategories {
      id
      name
    }
  }
`;

export const allAds = gql`
  query getAllAds {
    getAllAds {
      id
      title
      description
      owner
      email
      price
      pictures {
        url
      }
      location
      createdAt
      category {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const AdByIdDetails = gql`
  query getAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
      email
      price
      pictures {
        url
      }
      location
      createdAt
      category {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ALL_CATEGORIES_AND_TAGS = gql`
  query GetAllCategoriesAndTags {
    getAllCategories {
      id
      name
    }
    getAllTags {
      id
      name
    }
  }
`;

export const GET_ADS_BY_KEYWORD = gql`
  query GetAdsByKeyWord($title: String) {
    getAdsByKeyWord(title: $title) {
      id
      title
      description
      owner
      email
      price
      pictures {
        url
      }
      location
      createdAt
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;

export const LOGIN = gql`
  query Login($data: UserInput!) {
    login(data: $data)
  }
`;
