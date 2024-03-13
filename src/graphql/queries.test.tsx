import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProductCard from '../components/ProductCard';
import { GET_PRODUCTS } from './queries';
import { Product } from '../utils/types';

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: {
          items: [
            {
              id: '1',
              name: 'Pencil',
              description: 'Lorem ipsum',
              variants: [
                {
                  id: '1',
                  currencyCode: 'USD',
                  stockLevel: 'IN_STOCK',
                  price: 100,
                },
              ],
            },
          ],
        },
      },
    },
  },
];

it('renders data from GET_PRODUCTS query', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductCard
        product={mocks[0].result.data.products.items[0] as Product}
      />
    </MockedProvider>
  );
  expect(await screen.findByText('Pencil')).toBeInTheDocument();
});
