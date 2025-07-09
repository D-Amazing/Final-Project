import { doc, getDoc, updateDoc, deleteDoc,  } from "firebase/firestore";

const getUserProfile = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.data();
};

const updateUserProfile = async (uid: string, newData: object) => {
  await updateDoc(doc(db, "users", uid), newData);
};

const deleteUserAccount = async (uid: string) => {
  await deleteDoc(doc(db, "users", uid));
  await auth.currentUser?.delete();
};
export { getUserProfile, updateUserProfile, deleteUserAccount };

/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code provides functions for user profile management in a Firebase application.
 * 
 * 1. Importing Firestore Functions:
 *    - `doc`, `getDoc`, `updateDoc`, `deleteDoc`: Functions to interact with Firestore documents.
 * 
 * 2. getUserProfile Function:
 *    - Takes a user ID (`uid`) as an argument.
 *    - Retrieves the user's document from the "users" collection and returns its data.
 * 
 * 3. updateUserProfile Function:
 *    - Takes a user ID and an object containing new data.
 *    - Updates the user's document in the "users" collection with the new data.
 * 
 * 4. deleteUserAccount Function:
 *    - Takes a user ID as an argument.
 *    - Deletes the user's document from the "users" collection and deletes the user account from Firebase Authentication.
 */