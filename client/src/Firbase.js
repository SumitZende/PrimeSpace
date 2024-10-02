// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "primespace-cd677.firebaseapp.com",
  projectId: "primespace-cd677",
  storageBucket: "primespace-cd677.appspot.com",
  messagingSenderId: "687302748064",
  appId: "1:687302748064:web:7eaea781ed3db2a24366c5",
  measurementId: "G-N5RLNXSQR4"
};

// Initialize Firebase
export  const Gapp = initializeApp(firebaseConfig);
export   const  analytics = getAnalytics(Gapp);