/* eslint-disable react-refresh/only-export-components */
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
    }
  }
`;

export const AdByIdDetails = gql`
  query getAdById($getAdByIdId: Float!) {
    getAdById(title: $getAdByIdId) {
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
    }
  }
`;
