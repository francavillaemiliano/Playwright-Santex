import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { ProductGrid } from './components/ProductGrid';

describe('ProductList', () => {
  it('renders text and button', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductGrid />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
