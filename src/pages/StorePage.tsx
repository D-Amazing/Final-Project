// src/pages/StorePage.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
};

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center p-8">No products available.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product.id}
          className="border rounded shadow p-4 flex flex-col"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2 line-clamp-3">{product.description}</p>
          <p className="text-xl font-bold mt-auto">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default StorePage;
/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for displaying a store page with products fetched from Firebase Firestore.
 * 
 * 1. Importing Dependencies:
 *    - `useEffect`, `useState`: React hooks for managing component state and side effects.
 *    - `collection`, `getDocs`: Firestore functions to fetch documents from a collection.
 *    - `db`: Firebase Firestore database instance.
 * 
 * 2. Product Type Definition:
 *    - Defines a TypeScript type `Product` to represent the structure of product data.
 * 
 * 3. StorePage Component:
 *    - Uses `useState` to manage the list of products and loading state.
 *    - Uses `useEffect` to fetch products from the "products" collection in Firestore when the component mounts.
 * 
 * 4. Fetching Products:
 *    - Fetches documents from the "products" collection, maps them to the `Product` type, and updates the state.
 *    - Handles errors during fetching and sets loading state accordingly.
 * 
 * 5. Conditional Rendering:
 *    - Displays a loading message while products are being fetched.
 *    - Displays a message if no products are available.
 * 
 * 6. JSX Structure:
 *    - Renders a grid of product cards, each displaying an image, title, description, and price.
 */