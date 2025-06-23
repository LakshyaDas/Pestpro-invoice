// lib/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAY5VEOtiRg4m4PRI_EVRvnXVFcGXB8eVE",
  authDomain: "netflixclone-7960f.firebaseapp.com",
  projectId: "netflixclone-7960f",
  storageBucket: "netflixclone-7960f.appspot.com",
  messagingSenderId: "1046852741174",
  appId: "1:1046852741174:web:1712e6be882910f3fdd097",
  measurementId: "G-CS54EC3P1N"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
