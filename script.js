// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6Dg2RhC-y91NK_iouM03I9BoUYaUvhCY",
  authDomain: "personal-efa8d.firebaseapp.com",
  projectId: "personal-efa8d",
  storageBucket: "personal-efa8d.firebasestorage.app",
  messagingSenderId: "957420377074",
  appId: "1:957420377074:web:447a41c83e3798f68ed16b",
  measurementId: "G-WX4D1C22XK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
