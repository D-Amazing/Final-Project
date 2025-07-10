// src/pages/OrderHistory.tsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";

type Order = {
  id: string;
  total: number;
  createdAt?: Timestamp;
  products: {
    title: string;
    price: number;
    quantity: number;
  }[];
};

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Order, "id">),
        }));
        setOrders(data);
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to fetch orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow-sm">
              <div className="mb-2 text-sm text-gray-500">
                Order ID:{" "}
                <Link
                  to={`/orders/${order.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {order.id}
                </Link>
              </div>
              <div className="mb-2">
                <strong>Total:</strong>{" "}
                <span className="text-green-600 font-semibold">
                  ${order.total.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {order.createdAt
                  ? order.createdAt.toDate().toLocaleString()
                  : "No date"}
              </div>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {order.products.map((item, idx) => (
                  <li key={idx}>
                    {item.title} × {item.quantity} ($
                    {item.price.toFixed(2)})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;

// This component fetches and displays the user's order history.
// It uses Firebase Firestore to retrieve orders associated with the logged-in user.
/**
 * 🔨 Code Breakdown 🔨
 * * This code defines a React component for displaying a user's order history in an e-commerce application.    
 * 1. **Imports**:
 *    - `useAuth`: Custom hook to access authentication context.
 *   - Firebase Firestore functions to query orders.
 * 2. **Order Type**:
 *  - Defines a TypeScript type `Order` to represent the structure of an order, including fields like `id`, `total`, `createdAt`, and `products`.
 * 3. **OrderHistory Component**:
 *    - Uses `useAuth` to get the current user.
 *   - Uses `useState` to manage the list of orders.
 * 4. **useEffect Hook**:
 *   - Fetches orders from Firestore when the component mounts or when the user changes.
 *  - Queries the `orders` collection, filtering by the current user's ID and ordering by creation date.
 * 5. **Rendering**:
 *   - Displays a list of orders, showing the order ID, total amount, creation date
 * and a list of products in each order.
 *  - If no orders are found, it displays a message indicating that there are no orders
 * yet.
 * This component provides a user-friendly way for users to view their past orders, enhancing the overall shopping experience.
 * 
 * 🔨 Code Breakdown 
 * 🔨
 * This code defines a React component for displaying a user's order history in an e-commerce application.
 * 
 */