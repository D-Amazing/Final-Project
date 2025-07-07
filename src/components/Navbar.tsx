// components/Navbar.tsx
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store'; // Adjust the import path as necessary

const Navbar: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-pink-200/80 shadow-md">
      <Link to="/" className="text-2xl font-bold text-pink-700 animate-pulse">
        🛍️ Otaku Store
      </Link>
      <Link
        to="/cart"
        className="relative text-lg font-semibold text-pink-700 hover:text-pink-900"
      >
        Cart 🧺
        <span className="ml-1 px-2 py-1 text-sm bg-pink-600 text-white rounded-full">
          {cartCount}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar; 