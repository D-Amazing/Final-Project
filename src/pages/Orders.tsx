import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Adjust the path if necessary
import {CartItems} from "../types/types"


const createOrder = async (
  uid: string,
  cartItems: CartItems[],
  totalPrice: number
): Promise<void> => {
  try {
    await addDoc(collection(db, "orders"), {
      userId: uid,
      items: cartItems,
      totalPrice,
      createdAt: Timestamp.now(),
    });
    console.log("Order created successfully.");
  } catch (error) {
    console.error("Error creating order:", error);
  }
  
};


export default createOrder;
