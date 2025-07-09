import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;

/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code defines a React component for user login functionality.
 * 
 * 1. Importing Dependencies:
 *    - `useState`: React hook for managing component state.
 *    - `useAuth`: Custom hook to access authentication context.
 *    - `useNavigate`: Hook from React Router for navigation.
 * 
 * 2. Login Component:
 *    - Uses `useState` to manage email and password inputs.
 * 
 * 3. handleSubmit Function:
 *    - Prevents default form submission behavior.
 *    - Calls the `login` function from the authentication context with the provided email and password.
 *    - On successful login, navigates to the home page (`/`).
 *    - Catches and alerts any errors that occur during login.
 * 
 * 4. JSX Structure:
 *    - Renders a form with input fields for email and password, and a submit button.
 */