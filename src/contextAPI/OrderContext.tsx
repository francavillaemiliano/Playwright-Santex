import React, { createContext, useContext, useState } from 'react';

interface Product {
  variants: any;
  id: number;
  name: string;
  total: number;
  totalQuantity: number;
}

interface OrderContextType {
  order: Product[];
  setOrder: React.Dispatch<React.SetStateAction<Product[]>>;
  addItemToOrder: (product: Product) => void;
}

const OrderContext = createContext<OrderContextType>({
  order: [],
  setOrder: () => {},
  addItemToOrder: (product) => {},
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<Product[]>([]);

  const addItemToOrder = (product: Product) => {
    setOrder((prevOrder) => {
      const existingProductIndex = prevOrder.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedOrder = [...prevOrder];
        updatedOrder[existingProductIndex].totalQuantity +=
          product.totalQuantity;
        return updatedOrder;
      } else {
        return [...prevOrder, product];
      }
    });
  };

  return (
    <OrderContext.Provider value={{ order, setOrder, addItemToOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
