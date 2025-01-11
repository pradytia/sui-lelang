import { gql } from '@apollo/client';

// Mutations
export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $username: String!, $role: String!) {
    register(email: $email, password: $password, username: $username, role: $role) {
      id
      email
      username
      role
    }
  }
`;


export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        username
        role
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $productName: String!
    $price: String!
    $imageUrl: String!
    $description: String!
    $createdBy: String!
  ) {
    addProduct(
      productName: $productName
      price: $price
      imageUrl: $imageUrl
      description: $description
      createdBy: $createdBy
    ) {
      id
      productName
      price
      imageUrl
      description
      createdBy
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      productName
      price
      imageUrl
      description
      createdBy
    }
  }
`;

export const GET_BID = gql`
  query GetBids {
    getBids {
      id
      productName
      price
      priceBid
      productId
      description
      imageUrl
      createdBy
    }
  }
`;

export const SUBMIT_BID = gql`
mutation SubmitBid(
  $createdBy: String!
  $description: String!
  $productId: ID!
  $imageUrl: String!
  $price: String!
  $priceBid: String!
  $productName: String!
) {
  submitBid(
      createdBy: $createdBy
      description: $description
      productId: $productId
      imageUrl: $imageUrl
      price: $price
      priceBid: $priceBid
      productName: $productName
  ) {
      id
      productId
      productName
      price
      priceBid
      imageUrl
      description
      createdBy
  }
}
`;

