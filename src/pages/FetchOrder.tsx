import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; // your firebase config

const placeOrder = async (userId: string, cartItems: any[], total: number) => {
  try {
    const orderData = {
      userId,
      products: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
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