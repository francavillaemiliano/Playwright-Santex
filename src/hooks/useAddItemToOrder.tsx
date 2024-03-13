import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';
import { useOrder } from '../contextAPI/OrderContext';
import { Product } from '../utils/types';

const useAddItemToOrder = () => {
  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);
  const { addItemToOrder, setOrder, order } = useOrder();

  const sendOrder = async (product: Product, quantity: number) => {
    await addItemToOrderMutation({
      variables: {
        productVariantId: product.variants[0].id,
        quantity: quantity,
      },
    });

    const duplicatedItemIndex = order.findIndex(
      (item) => item.id === product.id
    );

    if (duplicatedItemIndex !== -1) {
      const duplicatedItem = order[duplicatedItemIndex];
      const updatedQuantity = duplicatedItem.totalQuantity + quantity;
      const updatedSubtotal = product.variants[0]?.price * updatedQuantity;

      const updatedItem = {
        ...duplicatedItem,
        totalQuantity: updatedQuantity,
        subtotal: updatedSubtotal,
      };

      const updatedOrder = [...order];
      updatedOrder[duplicatedItemIndex] = updatedItem;
      setOrder(updatedOrder);
    } else {
      const cartItem: Product = {
        currency: product.variants[0]?.currencyCode,
        id: product.id.toString(),
        name: product.name,
        total: product.variants[0]?.price,
        subtotal: product.variants[0]?.price * quantity,
        totalQuantity: quantity,
        variants: product.variants,
      };
      addItemToOrder(cartItem);
    }
  };
  return { sendOrder };
};
export default useAddItemToOrder;
