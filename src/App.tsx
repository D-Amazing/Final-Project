// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { Navbar } from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import StorePage from "./pages/StorePage";
import ProductDashboard from "./pages/ProductDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import ProfilePage from "./pages/ProfilePage";
import { Cart } from "./pages/Cart";

import { CartItems } from "./types/types"; // ✅ correct type import

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  // ✅ Add item to cart or increase quantity
  const handleAddToCart = (id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ Remove item or decrease quantity
  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<StorePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<ProductDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route
            />
            <Route path="/orders" element={<OrderHistory />} />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onAdd={handleAddToCart}
                  onRemove={handleRemoveFromCart}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;





/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines the main application component for a React app using React Router for navigation.
 * 
 * 1. Importing Dependencies:
 *    - `BrowserRouter`, `Routes`, `Route`, `Link`: Components from `react-router-dom` for routing and navigation.
 * 
 * 2. App Component:
 *    - Uses a functional component to define the main structure of the app.
 * 
 * 3. Navigation Bar:
 *    - Contains links to the Store page and Product Dashboard, styled with Tailwind CSS classes.
 * 
 * 4. Routes:
 *    - Defines two routes: one for the Store page and one for the Product Dashboard.
 * 
 * This component serves as the entry point for the application, providing navigation between different pages.
 */

