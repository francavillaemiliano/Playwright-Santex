import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        description
        assets {
          id
          source
        }
        variants {
          id
          price
          stockLevel
        }
      }
    }
  }
`;
