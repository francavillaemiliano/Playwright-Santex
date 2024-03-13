import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Product } from '../../utils/types';

jest.mock('../../hooks/useAddItemToOrder.tsx', () => ({
  __esModule: true,
  default: () => {
    return { sendOrder: (product: Product, quantity: Number) => {} };
  },
}));

describe('ProductCard component', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    description: 'This is a test product',
    variants: [
      {
        price: 1000,
        currencyCode: 'USD',
      },
    ],
    assets: [{ source: 'product-image.jpg' }],
  };

  const productNoImage = {
    ...product,
    assets: [{}],
  };

  test('renders image if product has an image', () => {
    render(<ProductCard product={product as Product} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();

    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveStyle(
      'background-image: url(product-image.jpg)'
    );
  });

  test('renders placeholder if product has no image', () => {
    render(<ProductCard product={productNoImage as Product} />);

    expect(screen.getByText('No image')).toBeInTheDocument();
  });
});
