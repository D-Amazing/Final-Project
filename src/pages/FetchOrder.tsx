import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; // ✅ adjust if needed
import { CartItems } from "../types/types"; // ✅ import your defined cart item type

const placeOrder = async (
  userId: string,
  cartItems: CartItems[],
  total: number
): Promise<void> => {
  try {
    const orderData = {
      userId,
      products: cartItems.map(({ id, title, price, quantity }) => ({
        id,
        title,
        price,
        quantity,
      })),
      total,
      createdAt: serverTimestamp(),
      status: "pending",
    };

    await addDoc(collection(db, "orders"), orderData);
    console.log("✅ Order placed!");
  } catch (err) {
    console.error("❌ Error placing order:", err);
  }
};

export default placeOrder;
