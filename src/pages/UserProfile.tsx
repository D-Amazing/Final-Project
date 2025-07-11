// ✅ FILE: src/pages/UserProfile.tsx
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
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";


// Add an explicit type for the profile
interface UserProfileData {
  name: string;
  address: string;
}

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfileData>({
    name: "",
    address: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as { name?: string; address?: string} | undefined 
        if(data) {
          setProfile({
            name: data.name || "",
            address: data.address || "",
          });
        }
      } 
    }
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      { ...profile, email: user.email },
      { merge: true }
    );
    alert("Profile updated!");
  };

  const handleDelete = async () => {
    if (!user) return;

    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    // Delete user-related products
    const productQuery = query(
      collection(db, "products"),
      where("userId", "==", user.uid)
    );
    const productSnap = await getDocs(productQuery);
    const deletions = productSnap.docs.map((docRef) =>
      deleteDoc(doc(db, "products", docRef.id))
    );
    await Promise.all(deletions);

    // Delete user document and Firebase Auth account
    await deleteDoc(doc(db, "users", user.uid));
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    }

    alert("Account deleted.");
    navigate("/register");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border"
          placeholder="Name"
        />
        <input
          type="text"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          className="w-full p-2 border"
          placeholder="Address"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-6 text-red-600 hover:underline"
      >
        Delete My Account
      </button> 
      <button
  onClick={async () => {
    await logout();
    navigate("/login");
  }}
  className="mt-4 text-blue-600 hover:underline"
>
  Logout
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