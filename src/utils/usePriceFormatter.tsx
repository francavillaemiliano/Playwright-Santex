import { useEffect, useState } from 'react';

const usePriceFormatter = (priceInCents: number): string => {
  const [formattedPrice, setFormattedPrice] = useState('');

  useEffect(() => {
    const formatPrice = (priceInCents: number): string => {
      const priceInDollars = (priceInCents / 100).toFixed(2);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(priceInDollars));
    };

    setFormattedPrice(formatPrice(priceInCents));
  }, [priceInCents]);

  return formattedPrice;
};

export default usePriceFormatter;
