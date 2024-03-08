import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';

const useAddItemToOrder = () => {
  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);

  const addItemToOrder = (productId: number, quantity: number) => {
    return addItemToOrderMutation({
      variables: { productVariantId: productId, quantity: quantity },
    });
  };

  return { addItemToOrder };
};

export default useAddItemToOrder;
