import { render, screen, fireEvent } from '@testing-library/react';
import CustomDrawer from './CustomDrawer';

jest.mock('../contextAPI/OrderContext', () => ({
  useOrder: () => ({
    order: [
      {
        id: '1',
        name: 'Test Product',
        totalQuantity: 2,
        subtotal: 10000,
        currency: 'USD',
      },
    ],
    setOrder: jest.fn(),
    totalPriceOrder: 20000,
    currency: 'USD',
  }),
}));

describe('CustomDrawer', () => {
  it('renders the order details', async () => {
    const onCloseMock = jest.fn();

    render(<CustomDrawer itemsTotal={1} isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText('Order:')).toBeInTheDocument();
    expect(screen.getByText('2 x Test Product')).toBeInTheDocument();
    expect(screen.getByText('Total: $200.00')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Confirm Order'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  describe('CustomDrawer', () => {
    it('renders a message when there are no items in the cart', () => {
      render(<CustomDrawer itemsTotal={0} isOpen={true} onClose={jest.fn()} />);

      const noItemsMessage = screen.getByText((content, element) => {
        return (
          content === "There're no items in your" &&
          element!.tagName.toLowerCase() === 'p'
        );
      });

      expect(noItemsMessage).toBeInTheDocument();
    });
  });
});
