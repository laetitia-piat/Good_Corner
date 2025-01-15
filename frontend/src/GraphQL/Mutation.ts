import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation createNewAd($data: AdInput!) {
    createNewAd(data: $data) {
      id
      title
      description
      price
      location
      createdAt
      pictures {
        url
      }
    }
  }
`;
export const CREATE_NEW_CATEGORY = gql`
  mutation CreateNewCategory($data: CategoryInput!) {
    createNewCategory(data: $data) {
      name
      id
    }
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($data: UpdateAdInput!) {
    updateAd(data: $data)
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAdById($deleteAdByIdId: Float!) {
    deleteAdById(id: $deleteAdByIdId)
  }
`;

export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;
