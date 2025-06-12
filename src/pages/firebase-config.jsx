// src/pages/firebase-config.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvqWruTJSwzTaRK3oEvByut9MymP9RLCA",
  authDomain: "my-frontend-project-4cd57.firebaseapp.com",
  databaseURL: "https://my-frontend-project-4cd57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-frontend-project-4cd57",
  storageBucket: "my-frontend-project-4cd57.firebasestorage.app",
  messagingSenderId: "827745696594",
  appId: "1:827745696594:web:352bd1759440780d3c588b",
  measurementId: "G-H7EDYQCH5Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export both the auth instance and getAuth function
export { auth, db, googleProvider, facebookProvider, signInWithPopup, getAuth };