// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDjwU9k6sn4pjVwn5NlKDiH4xhysHNSaa8",
  authDomain: "todolisttsapp.firebaseapp.com",
  projectId: "todolisttsapp",
  storageBucket: "todolisttsapp.appspot.com",
  messagingSenderId: "41847440996",
  appId: "1:41847440996:web:d0f2f8b379d6fc4aa50171",
};

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
