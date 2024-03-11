import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      totalItems
      items {
        id
        name
        description
        assets {
          id
          source
        }
        collections {
          name
        }
        variants {
          id
          currencyCode
          price
          stockLevel
        }
      }
    }
  }
`;
