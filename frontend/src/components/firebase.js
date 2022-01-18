// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuBH2PSS71TL-hJNRV-yZs7RzYbPFhatk",
  authDomain: "commerce4-7d9ce.firebaseapp.com",
  projectId: "commerce4-7d9ce",
  storageBucket: "commerce4-7d9ce.appspot.com",
  messagingSenderId: "285017824909",
  appId: "1:285017824909:web:f3a03ff0d32f85d7eaccc4",
  measurementId: "G-J237C2Q4S6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
