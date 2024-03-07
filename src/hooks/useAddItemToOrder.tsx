import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';

const useAddItemToOrder = () => {
  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);

  const addItemToOrder = (productId: number) => {
    return addItemToOrderMutation({
      variables: { productId },
    });
  };

  return { addItemToOrder };
};

export default useAddItemToOrder;
