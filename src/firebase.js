// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT4wLYKQFYH-Ulr1MZVZ-4maZ-pOp23co",
  authDomain: "netflix-project-59edd.firebaseapp.com",
  projectId: "netflix-project-59edd",
  storageBucket: "netflix-project-59edd.appspot.com",
  messagingSenderId: "822162880911",
  appId: "1:822162880911:web:e9f9e46c8d394fbaf0f3fa",
  measurementId: "G-CNMQBHR0DQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);