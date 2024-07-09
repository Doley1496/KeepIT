/* */

import { initializeApp } from "firebase/app";

/* In vite we use the env as import.meta.env.name_of_the env_variable. */

/* Our web app's Firebase configuration for locallly. */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_ID,
};

/* Initializing Firebase and exporting it. */
export const app = initializeApp(firebaseConfig);
