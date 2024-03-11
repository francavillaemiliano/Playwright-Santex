import React, { createContext, useContext } from 'react';
import { useStateWithStorage } from '../hooks/useStateWithStorage';
import { Product, OrderContextType } from '../utils/types';

const OrderContext = createContext<OrderContextType>({
  addItemToOrder: (product) => {},
  order: [],
  setOrder: () => {},
  totalPriceOrder: 0,
  currency: 'USD',
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useStateWithStorage<Product>('order', []);

  const currency = 'USD';

  const addItemToOrder = (product: Product) => {
    let newOrder: Product[];
    const existingProductIndex = order.findIndex((p) => p.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[existingProductIndex].totalQuantity += product.totalQuantity;
      newOrder = updatedOrder;
    } else {
      newOrder = [...order, product];
    }

    setOrder(newOrder);
  };

  const totalPriceOrder = order.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        addItemToOrder,
        totalPriceOrder,
        currency,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
