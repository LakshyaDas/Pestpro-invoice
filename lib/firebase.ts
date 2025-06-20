// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY5VEOtiRg4m4PRI_EVRvnXVFcGXB8eVE",
  authDomain: "netflixclone-7960f.firebaseapp.com",
  projectId: "netflixclone-7960f",
  storageBucket: "netflixclone-7960f.firebasestorage.app",
  messagingSenderId: "1046852741174",
  appId: "1:1046852741174:web:1712e6be882910f3fdd097",
  measurementId: "G-CS54EC3P1N"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);