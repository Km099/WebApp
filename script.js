const firebaseConfig = {
  apiKey: "AIzaSyBocnin97y62qx8MgnSek_U278ALDO3J1U",
  authDomain: "loginwebapp-a0881.firebaseapp.com",
  projectId: "loginwebapp-a0881",
  storageBucket: "loginwebapp-a0881.firebasestorage.app",
  messagingSenderId: "527045225230",
  appId: "1:527045225230:web:8b61c5a862ba148d47455f"
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
