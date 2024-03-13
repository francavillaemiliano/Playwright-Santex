import { render, screen } from '@testing-library/react';

import ProductCard from './ProductCard';
import { Product } from '../../utils/types';
import { OrderProvider } from '../../contextAPI/OrderContext';

describe('ProductCard component', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    description: 'This is a test product',
    variants: [
      {
        price: 10,
        currencyCode: 'USD',
      },
    ],
    assets: [{ source: 'product-image.jpg' }],
  };

  test('renders image if product has an image', () => {
    render(
      <OrderProvider>
        <ProductCard product={product as Product} />
      </OrderProvider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();

    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveStyle(
      'background-image: url(product-image.jpg)'
    );
  });
});
