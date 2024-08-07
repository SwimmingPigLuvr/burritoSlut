import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const userEmulator = true

if (userEmulator) {
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099'
}

// only run on server


// server side firebase client
export const app = initializeApp({ projectId: 'burritoSlut-demo' })
export const auth = getAuth(app)