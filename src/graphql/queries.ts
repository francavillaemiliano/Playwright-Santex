import { gql } from '@apollo/client';

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    description
    assets {
      id
      source
    }
    variants {
      id
      currencyCode
      price
      stockLevel
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      totalItems
      items {
        ...ProductFragment
      }
    }
  }
`;
