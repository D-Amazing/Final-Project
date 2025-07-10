import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      setError("You must be logged in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        userId: user.uid,
        products: cartItems.map(({ id, title, price, quantity }) => ({
          id,
          title,
          price,
          quantity,
        })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      };

      const ordersRef = collection(db, "orders");
      await addDoc(ordersRef, orderData);

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Order failed:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp5497755.jpg')`,
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-70 flex items-center justify-center">
        <div className="max-w-xl w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-lg text-gray-900">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            Checkout
          </h2>

          <div className="mb-4 text-lg">
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;




/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for the checkout page of an e-commerce application.
 * 
 * 1. Importing Dependencies:
 *    - `useState`: React hook for managing component state.
 *    - `useNavigate`: Hook from React Router for navigation.
 *    - `useAuth`: Custom hook to access authentication context.
 *    - Firebase Firestore functions for database operations.
 * 
 * 2. Mock Cart Data:
 *    - A mock cart array simulates items in the user's cart.
 * 
 * 3. CheckoutPage Component:
 *    - Uses `useState` to manage the cart items.
 *    - Calculates the total price of items in the cart.
 * 
 * 4. handleCheckout Function:
 *    - Checks if the user is logged in; if not, alerts them to log in.
 *    - Creates an order object with user ID, products, total price, and timestamp.
 *    - Adds the order to the Firestore database and navigates to the orders page.
 * 
 * 5. JSX Structure:
 *    - Renders a list of cart items with their title, quantity, and price.
 *    - Displays the total price and a button to place the order.
 */