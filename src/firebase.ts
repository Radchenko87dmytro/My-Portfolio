// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB2_sG0D1w8rETSil2YhlGWZMCqXW5Ik1M",
  authDomain: "todolistnativemode.firebaseapp.com",
  projectId: "todolistnativemode",
  storageBucket: "todolistnativemode.appspot.com",
  messagingSenderId: "1014286449827",
  appId: "1:1014286449827:web:a5cb112fc7dc90c0fa5316",
};

// Initialize Firebase Authentication and get a reference to the service
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
