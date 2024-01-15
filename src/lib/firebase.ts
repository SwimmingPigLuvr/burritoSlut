import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider, getRedirectResult, } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived, readable } from "svelte/store";
import type { MyUser, RestaurantData, Address, UserData, BurritoData } from "./types";

import { PUBLIC_FIREBASE_API_KEY } from "$env/static/public";
import { browser } from '$app/environment';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: "burritoslut-1a7c8.firebaseapp.com",
  projectId: "burritoslut-1a7c8",
  storageBucket: "burritoslut-1a7c8.appspot.com",
  messagingSenderId: "1005834415961",
  appId: "1:1005834415961:web:c33a00ff6289dcff646648",
  measurementId: "G-R6HZDMR11X"
};

// load firebase as needed by creating a store
function createApp() {
  let app: FirebaseApp

  const { subscribe } = readable<FirebaseApp>(undefined, (set) => {
    async function init() {
      if (!app) {
        const { initializeApp } = await import('firebase/app')
        app = initializeApp(firebaseConfig)
      }
      set(app)
    }

    if (browser) init()
  })

  return { subscribe }
}


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

async function providerFor(name: string) {
  const { GoogleAuthProvider } = await import('firebase/auth')
  switch (name) {
    case 'google': return new GoogleAuthProvider()
    default: throw 'unknown provider' + name
  }
}

async function signInWith(name: string) {
  const { signInWithRedirect } = await import('firebase/auth')
  const provider = await providerFor(name)
  await signInWithRedirect(auth, provider)
}

async function signOut() {
  const { signOut } = await import('firebase/auth')
  await signOut(auth)
}



