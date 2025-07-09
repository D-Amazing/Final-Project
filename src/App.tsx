// App.tsx
// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CheckoutPage from "./pages/CheckoutPage";
import StorePage from "./pages/StorePage";
import ProductDashboard from "./pages/ProductDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import ProfilePage from "./pages/ProfilePage";









const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="p-4 bg-gray-100 flex gap-4 justify-between">
      <div className="space-x-4">
        <Link to="/">Store</Link><br />
        <Link to="/dashboard">Dashboard</Link><br />
        <Link to="/profile">Profile</Link><br />
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700">Hello, {user.email}</span>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link><br />
            <Link to="/register">Register</Link>
            <Link to="/checkout">Checkout</Link><br />
            <Link to="/orders">My Orders</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<StorePage />} />
        <Route path="/dashboard" element={<ProductDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </Router>
  </AuthProvider>
);

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

