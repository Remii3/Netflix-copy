import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcm2IdGkIZKexV4x0KF5oUcVrm6QoPOsA",
  authDomain: "netflix-database-c4dbd.firebaseapp.com",
  projectId: "netflix-database-c4dbd",
  storageBucket: "netflix-database-c4dbd.appspot.com",
  messagingSenderId: "483560859204",
  appId: "1:483560859204:web:5e3e44cf94ff2dd5d0be11",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
export default db;
