import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Timestamp } from "firebase/firestore";

interface ProductItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  userId: string;
  products: ProductItem[];
  total: number;
  createdAt: Timestamp;
  status: string;
}

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // ✅ Validate and cast the order data
          const formattedOrder: Order = {
            userId: data.userId,
            products: data.products,
            total: data.total,
            createdAt: data.createdAt,
            status: data.status || "pending",
          };

          setOrder(formattedOrder);
        } else {
          console.warn("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="p-4">Loading order details...</p>;
  }

  if (!order) {
    return <p className="p-4 text-red-500">Order not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>User ID:</strong> {order.userId}
      </p>
      <p>
        <strong>Date:</strong> {order.createdAt.toDate().toLocaleString()}
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Items:</h3>
      <ul className="space-y-2">
        {order.products.map((item) => (
          <li key={item.id} className="border p-2 rounded">
            <p>
              <strong>{item.title}</strong>
            </p>
            <p>
              ${item.price.toFixed(2)} × {item.quantity}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-lg font-bold">
        Total: ${order.total.toFixed(2)}
      </p>
    </div>
  );
};

export default OrderDetailPage;

