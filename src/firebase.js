import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZKuksBSvPFqPwKtaqm3_ooeH6zTALxms",
  authDomain: "habitflow-d1dc3.firebaseapp.com",
  projectId: "habitflow-d1dc3",
  storageBucket: "habitflow-d1dc3.firebasestorage.app",
  messagingSenderId: "447484375749",
  appId: "1:447484375749:web:070ace9c5a9718b807b6ac",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);