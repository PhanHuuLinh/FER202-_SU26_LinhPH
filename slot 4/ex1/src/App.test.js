import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Margherita pizza card', () => {
  render(<App />);
  const pizzaElement = screen.getByText(/Margherita/i);
  expect(pizzaElement).toBeInTheDocument();
});

