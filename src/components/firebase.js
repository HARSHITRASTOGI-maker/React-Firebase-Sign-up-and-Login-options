// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

  
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCkm9bUM3crx4_E54IabeHS9h2LEcyChY8",
  authDomain: "fir-auth-2910.firebaseapp.com",
  projectId: "fir-auth-2910",
  storageBucket: "fir-auth-2910.appspot.com",
  messagingSenderId: "446593629319",
  appId: "1:446593629319:web:1c856a22bbac6ded5d0c22",
  measurementId: "G-HEVR6G6HFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const provider1 = new FacebookAuthProvider();

export {app,auth,provider,provider1,};
