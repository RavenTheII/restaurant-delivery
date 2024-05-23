import { render, screen } from '@testing-library/react';
import Checkout from '../components/Checkout';

test('renders checkout button', () => {
  render(<Checkout />);
  const checkoutButton = screen.getByText(/Proceed to Payment/i);
  expect(checkoutButton).toBeInTheDocument();
});
