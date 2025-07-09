// src/pages/CheckoutPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

const mockCart: CartItem[] = [
  { id: "1", title: "Anime Hoodie", price: 25, quantity: 1 },
  { id: "2", title: "Naruto Shirt", price: 15, quantity: 2 }
];

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart] = useState<CartItem[]>(mockCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) return alert("Please log in");

    const order = {
      userId: user.uid,
      products: [
        {id: "p1", title: "Anime Hoodie", price: 20, quantity: 2},
        {id: "p3", title: "Naruto T-shirt", price: 15, quantity:1}
      ],
      total:55,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "orders"), order);
    alert("Order placed!");
    navigate("/orders");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <ul className="space-y-3 mb-4">
        {cart.map((item) => (
          <li key={item.id} className="border p-3 rounded">
            <span>{item.title}</span> × {item.quantity} — ${item.price}
          </li>
        ))}
      </ul>
      <p className="font-bold text-lg">Total: ${total}</p>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
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