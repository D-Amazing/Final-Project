// pages/Home.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'; 

import { PuffLoader } from 'react-spinners';


interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
  rating: { rate: number };
}

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://fakestoreapi.com/products/categories');
      return res.data;
    },
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : 'https://fakestoreapi.com/products';
      const res = await axios.get(url);
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl text-pink-700 font-bold mb-4">🛒 Shop the Otaku Collection</h1>

      <select
        className="p-2 rounded border border-pink-400 mb-6"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {Array.isArray(categories) && categories.map((cat: string) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

    {isLoading ? (
  <div className="flex justify-center items-center h-60">
    <PuffLoader color="#ec4899" size={60} />
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product: Product) => (
      <div key={product.id} className="bg-white/80 rounded-lg p-3 shadow-sm">
  <img src={product.image} alt={product.title} className="h-36 object-contain mx-auto mb-1" />
  <h2 className="text-sm font-semibold text-pink-700">{product.title}</h2>
  <p className="text-xs italic mb-1">{product.description.slice(0, 80)}...</p>
  <p className="text-sm text-pink-800 font-bold">${product.price}</p>
  <p className="text-xs">Rating: {product.rating.rate} ⭐</p>
        

        <button
          className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart ✨
        </button>
      </div>
    ))}
  </div>
)}; 

    </div>
  );
}

export default Home;
// This Home component fetches product categories and products from the Fake Store API.
// It allows users to filter products by category and add them to the cart using Redux.
// The component uses React Query for data fetching and caching, ensuring efficient updates and re-fetching of data.
// The UI is styled with Tailwind CSS for a modern and responsive design.
// The products are displayed in a grid layout, with each product showing its image, title, description, price, and rating.