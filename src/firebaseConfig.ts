// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
/**
 * 🔨 Code Breakdown 🔨
 * 
 * This code initializes Firebase services in a JavaScript application.
 * 
 * 1. Importing Firebase Modules:
 *    - `initializeApp`: Initializes a Firebase app with the provided configuration.
 *    - `getAuth`: Retrieves the Firebase Authentication service instance.
 *    - `getFirestore`: Retrieves the Firestore database instance.
 * 
 * 2. Firebase Configuration Object:
 *    - Contains the necessary credentials and configuration details for connecting to a Firebase project.
 * 
 * 3. Initializing Firebase App:
 *    - Calls `initializeApp` with the configuration object to create a Firebase app instance.
 * 
 * 4. Exporting Auth and Firestore Instances:
 *    - Exports the initialized authentication and Firestore instances for use in other parts of the application.
 */