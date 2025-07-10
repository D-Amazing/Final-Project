import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart, CartItem } from '../pages/Cart';

describe('Cart Component', () => {
  const mockItems: CartItem[] = [
    { id: '1', title: 'Anime Hoodie', price: 20, quantity: 2 },
    { id: '2', title: 'Manga Shirt', price: 15, quantity: 1 },
  ];

  test('renders empty cart message', () => {
    render(<Cart items={[]} onAdd={() => {}} onRemove={() => {}} />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders items with correct quantity and price', () => {
    render(<Cart items={mockItems} onAdd={() => {}} onRemove={() => {}} />);
    expect(screen.getByText('Anime Hoodie')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $20.00')).toBeInTheDocument();

    expect(screen.getByText('Manga Shirt')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $15.00')).toBeInTheDocument();

    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: $55.00');
  });

  test('calls onAdd and onRemove when buttons are clicked', async () => {
    const user = userEvent.setup();
    const handleAdd = jest.fn();
    const handleRemove = jest.fn();

    render(<Cart items={mockItems} onAdd={handleAdd} onRemove={handleRemove} />);

    const addButton = screen.getByLabelText('Add one more Anime Hoodie');
    const removeButton = screen.getByLabelText('Remove one Anime Hoodie');

    await user.click(addButton);
    expect(handleAdd).toHaveBeenCalledWith('1');

    await user.click(removeButton);
    expect(handleRemove).toHaveBeenCalledWith('1');
  });
});
