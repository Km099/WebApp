// Firebase config (same as script.js)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const postContainer = document.getElementById("post");

db.collection("posts").doc(postId).get().then(doc => {
  if (doc.exists) {
    const post = doc.data();
    postContainer.innerHTML = `
      <h1 class="text-3xl font-bold">${post.title}</h1>
      <p class="text-sm text-gray-500 mb-4">${new Date(post.timestamp.toDate()).toLocaleString()}</p>
      <div class="bg-white p-4 rounded shadow">${post.content}</div>
    `;
  } else {
    postContainer.innerHTML = "<p>Post not found.</p>";
  }
});
