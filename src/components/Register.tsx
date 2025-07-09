// src/components/Register.tsx
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      createdAt: new Date(),
    });
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}
/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for user registration using Firebase Authentication and Firestore.
 * 
 * 1. Importing Firebase Modules:
 *    - `auth`: Firebase Authentication instance.
 *    - `db`: Firestore database instance.
 *    - `createUserWithEmailAndPassword`: Function to create a new user with email and password.
 *    - `doc`, `setDoc`: Functions to interact with Firestore documents.
 *    - `useState`: React hook for managing component state.
 * 
 * 2. Register Component:
 *    - Uses `useState` to manage email and password inputs.
 * 
 * 3. registerUser Function:
 *    - Asynchronously creates a new user with the provided email and password.
 *    - After successful registration, it saves the user's email and creation date in Firestore under the "users" collection.
 * 
 * 4. JSX Structure:
 *    - Renders input fields for email and password, and a button to trigger the registration process.
 */