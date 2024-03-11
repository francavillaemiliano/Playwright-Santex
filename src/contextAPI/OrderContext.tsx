import React, { createContext, useContext, useState } from 'react';
import { useStateWithStorage } from '../hooks/useStateWithStorage';
interface Product {
  currency: string;
  id: string;
  name: string;
  total: number;
  subtotal: number;
  totalQuantity: number;
  variants: {};
}

interface OrderContextType {
  order: Product[];
  setOrder: React.Dispatch<React.SetStateAction<Product[]>>;
  addItemToOrder: (product: Product) => void;
  totalPriceOrder: number;
  currency: string;
}

const OrderContext = createContext<OrderContextType>({
  addItemToOrder: (product) => {},
  order: [],
  setOrder: () => {},
  totalPriceOrder: 0,
  currency: 'USD',
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useStateWithStorage<Product[]>('order', []);
  const totalPriceOrder = order.reduce((acc, item) => acc + item.subtotal, 0);
  const currency = 'USD';
  console.log(order, 'orden');

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
    <OrderContext.Provider
      value={{ order, setOrder, addItemToOrder, totalPriceOrder, currency }}
    >
      {children}
    </OrderContext.Provider>
  );
};
