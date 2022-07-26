// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDEs7Chix5mq7cnNCRQyJfx3IkOBz2Y8LY",
  authDomain: "appchat-dd87a.firebaseapp.com",
  projectId: "appchat-dd87a",
  storageBucket: "appchat-dd87a.appspot.com",
  messagingSenderId: "290032833186",
  appId: "1:290032833186:web:8830f2c0a43fb536783dfb",
  measurementId: "G-HHYNMNJH95",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
