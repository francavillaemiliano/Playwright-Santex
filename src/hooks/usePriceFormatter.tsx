import { useEffect, useState } from 'react';

const usePriceFormatter = (
  priceInCents: number,
  currencyCode: string
): string => {
  const [formattedPrice, setFormattedPrice] = useState('');

  useEffect(() => {
    const formatPrice = (
      priceInCents: number,
      currencyCode: string
    ): string => {
      const priceInDollars = (priceInCents / 100).toFixed(2);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(Number(priceInDollars));
    };

    setFormattedPrice(formatPrice(priceInCents, currencyCode));
  }, [priceInCents, currencyCode]);

  return formattedPrice;
};

export default usePriceFormatter;
