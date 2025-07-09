// src/pages/ProfilePage.tsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, auth } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  deleteField
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", address: "" });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setProfile({
          name: data.name || "",
          address: data.address || "",
        });
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, { ...profile, email: user.email }, { merge: true });
    alert("Profile updated!");
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    // Delete user's products (optional, clean up)
    const productQuery = query(collection(db, "products"), where("userId", "==", user.uid));
    const productSnap = await getDocs(productQuery);
    const deletions = productSnap.docs.map(docRef => deleteDoc(doc(db, "products", docRef.id)));
    await Promise.all(deletions);

    // Delete user document
    await deleteDoc(doc(db, "users", user.uid));

    // Delete Firebase Auth account
    await deleteUser(auth.currentUser!);

    alert("Account deleted.");
    navigate("/register");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border"
        />
        <input
          type="text"
          placeholder="Address"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          className="w-full p-2 border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-6 text-red-600 hover:underline"
      >
        Delete My Account
      </button>
    </div>
  );
};

export default ProfilePage;
/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for managing user profiles in a Firebase application.
 * 
 * 1. Importing Dependencies:
 *    - `useAuth`: Custom hook to access authentication context.
 *    - `db`, `auth`: Firebase Firestore and Authentication instances.
 *    - Firestore functions: `doc`, `getDoc`, `setDoc`, `deleteDoc`, `collection`, `query`, `where`, `getDocs`.
 *    - `useNavigate`: Hook from React Router for navigation.
 * 
 * 2. ProfilePage Component:
 *    - Uses `useState` to manage the user's profile data (name and address).
 *    - Uses `useEffect` to fetch the user's profile from Firestore when the component mounts.
 * 
 * 3. handleUpdate Function:
 *    - Updates the user's profile in Firestore with the current state of the profile.
 * 
 * 4. handleDelete Function:
 *    - Deletes the user's products (optional), user document from Firestore, and Firebase Auth account.
 * 
 * 5. JSX Structure:
 *    - Renders input fields for name and address, a button to update the profile, and a button to delete the account.
 */