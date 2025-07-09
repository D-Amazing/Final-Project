// src/pages/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function UserProfile() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState({ name: "", address: "" });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProfile(docSnap.data());
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    await updateDoc(doc(db, "users", user!.uid), profile);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "users", user!.uid));
    await user!.delete();
  };

  return (
    <div>
      <h1>Profile</h1>
      <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
      <input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}

/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for managing user profiles in a Firebase application.
 * 
 * 1. Importing Firebase Modules:
 *    - `auth`: Firebase Authentication instance.
 *    - `db`: Firestore database instance.
 *    - `doc`, `getDoc`, `updateDoc`, `deleteDoc`: Functions to interact with Firestore documents.
 * 
 * 2. UserProfile Component:
 *    - Uses `useState` to manage the user's profile data (name and address).
 *    - Uses `useEffect` to fetch the user's profile from Firestore when the component mounts.
 * 
 * 3. handleUpdate Function:
 *    - Updates the user's profile in Firestore with the current state of the profile.
 * 
 * 4. handleDelete Function:
 *    - Deletes the user's document from Firestore and deletes the user account from Firebase Authentication.
 * 
 * 5. JSX Structure:
 *    - Renders input fields for name and address, and buttons for updating and deleting the account.
 */