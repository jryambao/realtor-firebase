// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:
    "AIzaSyClVexRGF8nmveHrJ4XSPkYNIPABQJErgw",
  authDomain: "realtor-firebase.firebaseapp.com",
  projectId: "realtor-firebase",
  storageBucket: "realtor-firebase.appspot.com",
  messagingSenderId: "78474986813",
  appId:
    "1:78474986813:web:93038c7d81e6c869847154",
  measurementId: "G-TS42MFBBKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();
