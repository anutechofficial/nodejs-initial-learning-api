// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvoIl0u8QstfTI0recJauCfOJdS1d0aBw",
  authDomain: "testing-fcm-2e74a.firebaseapp.com",
  projectId: "testing-fcm-2e74a",
  storageBucket: "testing-fcm-2e74a.appspot.com",
  messagingSenderId: "936854342351",
  appId: "1:936854342351:web:2517af6de225f89d53c5ba",
  measurementId: "G-MX7V9YS347"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);