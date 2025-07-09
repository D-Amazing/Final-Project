import { addDoc, collection, Timestamp } from "firebase/firestore";

const createOrder = async (uid, cartItems, totalPrice) => {
  await addDoc(collection(db, "orders"), {
    userId: uid,
    items: cartItems,
    totalPrice,
    createdAt: Timestamp.now(),
  });
};
export default createOrder;