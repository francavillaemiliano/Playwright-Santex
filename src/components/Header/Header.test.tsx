import { render } from '@testing-library/react';
import Header from './Header';

jest.mock('../../contextAPI/OrderContext', () => ({
  useOrder: () => {
    return { order: [{ subtotal: 10000, currency: 'USD' }] };
  },
}));

describe('Header', () => {
  it('renders text the order total', async () => {
    const { getByText } = render(<Header />);
    const renderedText = getByText('$100.00');
    expect(renderedText).toBeInTheDocument();
  });
});
