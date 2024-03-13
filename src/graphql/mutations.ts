import { gql } from '@apollo/client';

export const ORDER_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    totalQuantity
    subTotal
    currencyCode
    total
    totalWithTax
  }
`;

export const ADD_ITEM_TO_ORDER = gql`
  ${ORDER_FRAGMENT}
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderFragment
    }
  }
`;
