// src/firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlYcLAdJIK4xtsC0iaXmvFtzBI75EVxcU",
  authDomain: "anime-store-187a4.firebaseapp.com",
  projectId: "anime-store-187a4",
  storageBucket: "anime-store-187a4.firebasestorage.app",
  messagingSenderId: "894947927108",
  appId: "1:894947927108:web:ca403688afa97704ac0811",
  measurementId: "G-ZXJT6B99Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };


/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code initializes Firebase services in a JavaScript application.
 * 
 * 1. Importing Firebase Modules:
 *    - `initializeApp`: Initializes a Firebase app with the provided configuration.
 *    - `getAnalytics`: Retrieves the Firebase Analytics service instance.
 *    - `getAuth`: Retrieves the Firebase Authentication service instance.
 *    - `getFirestore`: Retrieves the Firestore database instance.
 * 
 * 2. Firebase Configuration Object:
 *    - Contains the necessary credentials and configuration details for connecting to a Firebase project.
 * 
 * 3. Initializing Firebase App:
 *    - Calls `initializeApp` with the configuration object to create a Firebase app instance.
 * 
 * 4. Initializing Firebase Services:
 *    - Initializes Analytics, Authentication, and Firestore services using their respective functions.
 * 
 * 5. Exporting Instances:
 *    - Exports the initialized app, analytics, auth, and db instances for use in other parts of the application.
 */