// Your Firebase config (using compat SDK for GitHub Pages compatibility)
const firebaseConfig = {
  apiKey: "AIzaSyC6Dg2RhC-y91NK_iouM03I9BoUYaUvhCY",
  authDomain: "personal-efa8d.firebaseapp.com",
  projectId: "personal-efa8d",
  storageBucket: "personal-efa8d.appspot.com", // Corrected this line
  messagingSenderId: "957420377074",
  appId: "1:957420377074:web:447a41c83e3798f68ed16b",
  measurementId: "G-WX4D1C22XK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup
function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup successful!"))
    .catch(error => alert(error.message));
}

// Login
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Login successful!"))
    .catch(error => alert(error.message));
}
