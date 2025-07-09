import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

/**
 * 🔨 Code Breakdown 🔨
 * * This code defines a React component for user registration functionality.
 * * 1. Importing Dependencies:
 * *    - `useState`: React hook for managing component state.
 * *    - `useAuth`: Custom hook to access authentication context.
 * *    - `useNavigate`: Hook from React Router for navigation.
 * * 2. Register Component:
 * *    - Uses `useState` to manage email and password inputs.
 * * 3. handleSubmit Function:
 * *    - Handles form submission, preventing default behavior.
 * *    - Calls the `register` function from the authentication context with email and password.
 * *    - On successful registration, navigates to the home page.
 * * 4. JSX Structure:
 * *    - Renders input fields for email and password, and a button to trigger the
 * *      registration process.
 * * This component allows users to create a new account by providing an email and password.
 * * It handles form submission and integrates with the authentication context to register the user.
 * 
 */