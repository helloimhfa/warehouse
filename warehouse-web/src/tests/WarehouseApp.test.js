import { render, screen } from '@testing-library/react';
import WarehouseApp from '../components/WarehouseApp';

test('Renders add product button', () => {
  render(<WarehouseApp />);
  const linkElement = screen.getByText(/new product/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders add article button', () => {
  render(<WarehouseApp />);
  const linkElement = screen.getByText(/new product/i);
  expect(linkElement).toBeInTheDocument();
});


// TODO: test de que carga productos
// test('Renders add product button', () => {
//   render(<WarehouseApp />);
//   const linkElement = screen.getByText(/new product/i);
//   expect(linkElement).toBeInTheDocument();
// });

// TODO: test de que carga articulos
// test('Renders add product button', () => {
//   render(<WarehouseApp />);
//   const linkElement = screen.getByText(/new product/i);
//   expect(linkElement).toBeInTheDocument();
// });
