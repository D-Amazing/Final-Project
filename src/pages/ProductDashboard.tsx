import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // adjust path if needed

// ✅ Product Type
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image?: string;
}

const ProductDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: parseFloat(form.price),
    };

    if (editId) {
      await updateDoc(doc(db, "products", editId), productData);
      setEditId(null);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    setForm({ title: "", price: "", description: "", image: "" });

    const querySnapshot = await getDocs(collection(db, "products"));
    const updatedList: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(updatedList);
  };

  const handleEdit = (product: Product) => {
    setForm({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      image: product.image || "",
    });
    setEditId(product.id);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    const querySnapshot = await getDocs(collection(db, "products"));
    const updatedList: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(updatedList);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-gray-500">{product.description}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div>
            <div>
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-4 py-2 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDashboard;




/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code provides functions for managing products in a Firebase Firestore database.
 * 
 * 1. Importing Firestore Functions:
 *    - `collection`, `getDocs`, `addDoc`, `updateDoc`, `deleteDoc`, `doc`: Functions to interact with Firestore collections and documents.
 * 
 * 2. fetchProducts Function:
 *    - Retrieves all documents from the "products" collection and returns them as an array of objects.
 * 
 * 3. addProduct Function:
 *    - Takes a product object as an argument and adds it to the "products" collection.
 * 
 * 4. updateProduct Function:
 *    - Takes a product ID and an object containing updated data, and updates the corresponding document in the "products" collection.
 * 
 * 5. deleteProduct Function:
 *    - Takes a product ID and deletes the corresponding document from the "products" collection.
 */