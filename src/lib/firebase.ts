import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";
import type { MyUser, RestaurantData, Address, UserData, BurritoData } from "./types";



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
export const storage = getStorage();

// auth
export const auth = getAuth(app);
onAuthStateChanged(auth, user => {
  // check for user status
});


function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("auth is not initialized or not in browser");
    const { subscribe } = writable<MyUser | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

    return {
      subscribe,
    };
}

export const user: Readable<MyUser | null> = userStore();

export function docStore<T>(path: string) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

export const userData: Readable<UserData | null> = derived(
  user,
  ($user, set) => {
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null);
    }
  },
);

const provider = new GoogleAuthProvider();