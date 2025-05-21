// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvqWruTJSwzTaRK3oEvByut9MymP9RLCA",
  authDomain: "my-frontend-project-4cd57.firebaseapp.com",
  projectId: "my-frontend-project-4cd57",
    storageBucket: "my-frontend-project-4cd57.firebasestorage.app",
  messagingSenderId: "827745696594",
  appId: "1:827745696594:web:352bd1759440780d3c588b",
  measurementId: "G-H7EDYQCH5Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
