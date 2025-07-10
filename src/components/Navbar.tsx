// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      className="p-4 bg-gray-900 text-white flex justify-between items-center sticky top-0 z-50 shadow-md"
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Left side: Site title + main links */}
      <div className="flex gap-x-8 items-center">
        <h1 className="font-extrabold text-3xl mr-8 select-none">
          AnimeCollectibles Store
        </h1>
        <Link
          to="/"
          className="text-lg hover:underline cursor-pointer visited:text-white"
        >
          Store
        </Link>
        <Link
          to="/dashboard"
          className="text-lg hover:underline cursor-pointer visited:text-white"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="text-lg hover:underline cursor-pointer visited:text-white"
        >
          Profile
        </Link>
      </div>

      {/* Right side: Auth + Cart related links */}
      <div className="flex gap-x-6 items-center text-lg">
        {user ? (
          <>
            <span className="select-none">Hello, {user.email}</span>
            <Link
              to="/cart"
              className="hover:underline cursor-pointer visited:text-white"
            >
              My Cart
            </Link>
            <Link
              to="/checkout"
              className="hover:underline cursor-pointer visited:text-white"
            >
              Checkout
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer select-none"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:underline cursor-pointer visited:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:underline cursor-pointer visited:text-white"
            >
              Register
            </Link>
            <Link
              to="/cart"
              className="hover:underline cursor-pointer visited:text-white"
            >
              My Cart
            </Link>
            <Link
              to="/checkout"
              className="hover:underline cursor-pointer visited:text-white"
            >
              Checkout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};


/**
 * Code Breakdown 
 * 
 */