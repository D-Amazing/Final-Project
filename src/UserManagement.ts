import { deleteDoc, doc } from "firebase/firestore";
import { auth} from "./firebaseConfig"; 
import {db} from "./firebase/firebase"; 

export const deleteUserAccount = async (uid: string) => {
  try {
    await deleteDoc(doc(db, "users", uid));

    const currentUser = auth.currentUser;
    if (currentUser) {
      await currentUser.delete();
      console.log("✅ User deleted from auth and Firestore.");
    } else {
      console.warn("⚠️ No authenticated user found.");
    }
  } catch (err) {
    console.error("❌ Error deleting user account:", err);
  }
};


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