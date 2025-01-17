import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation createNewAd($data: AdInput!) {
    createNewAd(data: $data) {
      id
      title
      description
      price
      location
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

export const LOGIN = gql`
  mutation Login($data: UserInput!) {
    login(data: $data)
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($codeByUser: String!) {
    confirmEmail(codeByUser: $codeByUser)
  }
`;
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($userEmail: String!) {
    forgotPassword(userEmail: $userEmail)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $code: String!) {
    changePassword(password: $password, code: $code)
  }
`;
