const firebaseConfig = {
  apiKey: "AIzaSyBocnin97y62qx8MgnSek_U278ALDO3J1U",
  authDomain: "loginwebapp-a0881.firebaseapp.com",
  projectId: "loginwebapp-a0881",
  storageBucket: "loginwebapp-a0881.firebasestorage.app",
  messagingSenderId: "527045225230",
  appId: "1:527045225230:web:8b61c5a862ba148d47455f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load posts
const postsContainer = document.getElementById("posts");
db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
  snapshot.forEach(doc => {
    const post = doc.data();
    post.id = doc.id; 
    const div = document.createElement("div");
    div.innerHTML = `
      <a href="post.html?id=${doc.id}" class="block p-4 bg-white rounded shadow hover:bg-gray-50">
        <h2 class="text-xl font-semibold">${post.title}</h2>
        <p class="text-sm text-gray-600">${new Date(post.timestamp.toDate()).toLocaleString()}</p>
      </a>
    `;
    postsContainer.appendChild(div);
  });
});
