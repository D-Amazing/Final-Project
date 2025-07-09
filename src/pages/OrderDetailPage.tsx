// src/pages/OrderDetailPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const ref = doc(db, "orders", id!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() });
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
      <p className="mb-2 text-gray-600">
        Placed on: {order.createdAt?.toDate().toLocaleString()}
      </p>
      <p className="mb-4 font-semibold">Total: ${order.total}</p>

      <ul className="space-y-3">
        {order.products.map((item: any, idx: number) => (
          <li key={idx} className="border p-3 rounded">
            {item.title} × {item.quantity} — ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailPage;
