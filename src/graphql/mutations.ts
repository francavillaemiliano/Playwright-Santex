import { gql } from '@apollo/client';

export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productId: ID!) {
    addItemToOrder(productId: $productId) {
      id
    }
  }
`;
