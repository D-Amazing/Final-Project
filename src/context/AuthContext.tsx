import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)!;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;
    await setDoc(doc(db, "users", uid), {
      email,
      createdAt: new Date(),
    });
  };

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines an authentication context for a React application using Firebase.
 * 
 * 1. Importing Firebase Modules:
 *    - `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`: Functions for user authentication.
 *    - `doc`, `setDoc`: Functions to interact with Firestore documents.
 *    - `auth`, `db`: Firebase authentication and Firestore database instances.
 * 
 * 2. AuthContextType Interface:
 *    - Defines the shape of the authentication context, including user state, loading state, and methods for registration, login, and logout.
 * 
 * 3. AuthContext:
 *    - Creates a context for authentication that can be used throughout the application.
 * 
 * 4. useAuth Hook:
 *    - A custom hook to access the authentication context easily.
 * 
 * 5. AuthProvider Component:
 *    - Manages user state and loading state.
 *    - Provides methods for registering, logging in, and logging out users.
 *    - Uses `onAuthStateChanged` to listen for authentication state changes and update the user state accordingly.
 */