const priceFormatter = (priceInCents: number, currencyCode: string): string => {
  const formattedPrice = (
    priceInCents: number,
    currencyCode: string
  ): string => {
    if (!currencyCode || currencyCode.trim() === '') {
      return '';
    }

    const priceInDollars = (priceInCents / 100).toFixed(2);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(Number(priceInDollars));
  };

  return formattedPrice(priceInCents, currencyCode);
};

export default priceFormatter;
