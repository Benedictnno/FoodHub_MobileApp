// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ1XYaxO1ax8WMgmBeydm9ixQBkpHpqHY",
  authDomain: "foodrecipes-73a85.firebaseapp.com",
  projectId: "foodrecipes-73a85",
  storageBucket: "foodrecipes-73a85.appspot.com",
  messagingSenderId: "279389161185",
  appId: "1:279389161185:web:feb007f21deb5c9f4f99a0",
  measurementId: "G-CYFFQ7LQ11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const GoogleAuth = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
