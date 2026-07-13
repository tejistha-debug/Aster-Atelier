import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbT6DER5uDbsrIVssiaSG22a8ur3UIDJA",
  authDomain: "aster-atelier.firebaseapp.com",
  projectId: "aster-atelier",
  storageBucket: "aster-atelier.firebasestorage.app",
  messagingSenderId: "848119511603",
  appId: "1:848119511603:web:79e664d2a6bee7d0364146"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);