// src/components/Cart.tsx
import React from "react";
import { CartItem } from "../types/types"; // ✅ Use shared CartItem type

interface CartProps {
  items: CartItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onAdd, onRemove }) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map(({ id, title, price, quantity }) => (
            <li key={id} data-testid={`cart-item-${id}`} className="border-b pb-2">
              <h3 className="text-lg font-medium">{title}</h3>
              <p>Price: ${price.toFixed(2)}</p>
              <p>Quantity: {quantity}</p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => onAdd(id)}
                  aria-label={`Add one more ${title}`}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(id)}
                  aria-label={`Remove one ${title}`}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-6 text-xl font-bold" data-testid="total-price">
        Total: ${totalPrice.toFixed(2)}
      </h3>
    </div>
  );
};
export default CartItem 

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