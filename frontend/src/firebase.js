// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-81899.firebaseapp.com",
  projectId: "mern-blog-81899",
  storageBucket: "mern-blog-81899.appspot.com",
  messagingSenderId: "772824145086",
  appId: "1:772824145086:web:dd56aa55948d62e633d2ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);