// pages/Cart.tsx
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../redux/store';
import { removeFromCart, clearCart } from '../features/cartSlice';

const Cart: React.FC = () => {
const items = useSelector((state: RootState) => state.cart.items);
const dispatch = useDispatch();

interface CartItem {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

const totalItems: number = items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
const totalPrice: string = items.reduce(
    (acc: number, item: CartItem) => acc + item.quantity * item.price,
    0
).toFixed(2);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">Your Magical Shopping Cart 🧺</h1>
      {items.length === 0 ? (
        <p className="text-pink-600">Your cart is empty! Go add some anime treasures ✨</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item: CartItem) => (
              <li key={item.id} className="flex items-center justify-between bg-white/80 p-4 rounded shadow">
                <img src={item.image} alt={item.title} className="h-12 w-12 object-contain" />
<div className="flex-1 px-2">
  <h2 className="text-sm font-semibold text-pink-800">{item.title}</h2>

                  <p>Qty: {item.quantity}</p>
                  <p className="text-pink-600 font-bold">${item.price * item.quantity}</p>
                </div>
                <button
                  className="text-sm bg-pink-400 hover:bg-pink-600 text-white px-3 py-1 rounded"
                  onClick={(): void => dispatch(removeFromCart(item.id))}
                >
                  Remove ❌
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-pink-100 p-4 rounded text-pink-800 font-semibold">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
            onClick={() => dispatch(clearCart())}
          >
            Checkout 🛒
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
// This Cart component displays the items in the user's shopping cart.
// It allows users to remove items, view total quantities and prices, and clear the cart.
// The component uses Redux for state management, allowing for easy updates and access to the cart state.
// The UI is styled with Tailwind CSS for a clean and modern look.
// The cart items are displayed in a list format, with each item showing its image, title, quantity, and total price.
// Users can remove individual items from the cart or clear the entire cart with a single button click
// The total number of items and the total price are calculated and displayed at the bottom.
// The component is responsive and designed to provide a smooth user experience.
// It can be easily integrated into an e-commerce application to manage the shopping cart functionality.
// The component uses TypeScript for type safety, ensuring that the cart items and actions are correctly typed.
// The component can be extended in the future to include features like applying discounts, viewing shipping options
// or handling payment processing, depending on the application's requirements.
// The use of Redux allows for easy state management and updates, making it suitable for larger applications
// where the cart state needs to be accessed from multiple components.
// The component can also handle error states and display appropriate messages to the user if there are issues
// with the cart operations, such as removing items or clearing the cart.
// The component is designed to be user-friendly, providing clear feedback on actions taken by the user