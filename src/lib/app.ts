// temporarily commenting this out to fix the issue of default app already created
// this is a test to see how fast i can type

// import { browser, dev } from '$app/environment'
// import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
// import { readable } from 'svelte/store'
// // import {
// //     PUBLIC_FIREBASE_API_KEY,
// //     PUBLIC_FIREBASE_AUTH_DOMAIN,
// //     PUBLIC_FIREBASE_PROJECT_ID,
// //     PUBLIC_FIREBASE_STORAGE_BUCKET,
// //     PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
// //     PUBLIC_FIREBASE_APP_ID,
// // } from '$env/static/public'

// const firebaseConfig: FirebaseOptions = dev
//     ? { apiKey: 'demo', authDomain: 'demo.firebaseapp.com' }
//     : {
//         apiKey: 'AIzaSyCod60FyEfWwW2oagOhFzR9xZsqrfECtA4',
//         authDomain: 'burritoslut-1a7c8.firebaseapp.com',
//         projectId: 'burritoslut-1a7c8',
//         storageBucket: 'burritoslut-1a7c8.appspot.com',
//         messagingSenderId: '1005834415961',
//         appId: '1:1005834415961:web:c33a00ff6289dcff646648',
//     }

// // load the firebase app as needed by putting it in a store
// // this can then be used in derived stores for auth, firestore, and other services

// function createApp() {
//     let app: FirebaseApp
    
//     const { subscribe } = readable<FirebaseApp>(undefined, (set) => {
//         async function init() {
//             if (!app) {
//                 const { initializeApp } = await import ('firebase/app')
//                 app = initializeApp(firebaseConfig)
//             }
//             set(app)
//         }

//         if (browser) init()
//     })

//     return { subscribe }
// }

// export const app = createApp()