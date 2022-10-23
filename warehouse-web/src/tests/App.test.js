import { render, screen } from '@testing-library/react';
import WarehouseApp from '../WarehouseApp';

test('renders learn react link', () => {
  render(<WarehouseApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
