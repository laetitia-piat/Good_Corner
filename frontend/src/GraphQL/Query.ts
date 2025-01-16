import { gql } from "@apollo/client";

export const byCategory = gql`
  query getAdsByCategory($categoryName: String!) {
    getAdsByCategory(categoryName: $categoryName) {
      id
      title
      description
      price
      user {
        email
      }
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
      price
      user {
        email
      }
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
      price
      user {
        email
      }
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
      price
      user {
        email
      }
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

export const GET_USER_INFOS = gql`
  query GetUserInfo {
    getUserInfo {
      isLoggedIn
      email
    }
  }
`;
