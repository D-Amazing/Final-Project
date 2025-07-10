import { render, screen } from '@testing-library/react';
import { Hello } from '../components/Hello';

test('renders greeting', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, Naruto!')).toBeInTheDocument();
});
