import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCod60FyEfWwW2oagOhFzR9xZsqrfECtA4",
  authDomain: "burritoslut-1a7c8.firebaseapp.com",
  projectId: "burritoslut-1a7c8",
  storageBucket: "burritoslut-1a7c8.appspot.com",
  messagingSenderId: "1005834415961",
  appId: "1:1005834415961:web:c33a00ff6289dcff646648",
  measurementId: "G-R6HZDMR11X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
const analytics = getAnalytics(app);