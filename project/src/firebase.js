// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQNJO2-elM9Wv6tN2s4m3eKaB3Okyee7o",
  authDomain: "ai-skincares.firebaseapp.com",
  projectId: "ai-skincares",
  storageBucket: "ai-skincares.appspot.com",
  messagingSenderId: "383284639353",
  appId: "1:383284639353:web:f44db3fb523159c69dc6a8",
  measurementId: "G-HWHMP0JD62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { app, auth, db, RecaptchaVerifier, signInWithPhoneNumber };
