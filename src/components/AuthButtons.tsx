// src/components/AuthButtons.tsx
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export default function AuthButtons() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for user authentication using Firebase.
 * 
 * 1. Importing Firebase Modules:
 *    - `auth`: Firebase Authentication instance.
 *    - `signInWithEmailAndPassword`: Function to sign in a user with email and password.
 *    - `signOut`: Function to log out the current user.
 *    - `useState`: React hook for managing component state.
 * 
 * 2. AuthButtons Component:
 *    - Uses `useState` to manage email and password inputs.
 * 
 * 3. login Function:
 *    - Calls `signInWithEmailAndPassword` with the provided email and password to authenticate the user.
 * 
 * 4. logout Function:
 *    - Calls `signOut` to log out the current user.
 * 
 * 5. JSX Structure:
 *    - Renders input fields for email and password, and buttons for login and logout actions. 
 * 
 * This component allows users to log in and out of the application using Firebase Authentication.
 * It provides a simple interface for entering credentials and managing user sessions.
 * 
 */