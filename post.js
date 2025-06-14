const firebaseConfig = {
  apiKey: "AIzaSyBocnin97y62qx8MgnSek_U278ALDO3J1U",
  authDomain: "loginwebapp-a0881.firebaseapp.com",
  projectId: "loginwebapp-a0881",
  storageBucket: "loginwebapp-a0881.appspot.com",
  messagingSenderId: "527045225230",
  appId: "1:527045225230:web:8b61c5a862ba148d47455f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const postContainer = document.getElementById("post");
const commentsDiv = document.getElementById("comments");

// Load post
db.collection("posts").doc(postId).get().then(doc => {
  if (doc.exists) {
    const post = doc.data();
    postContainer.innerHTML = `
      <h1 class="text-3xl font-bold">${post.title}</h1>
      <p class="text-sm text-gray-500 mb-4">${new Date(post.timestamp?.toDate()).toLocaleString()}</p>
      <div class="bg-white p-4 rounded shadow">${post.content}</div>
    `;
  } else {
    postContainer.innerHTML = "<p>Post not found.</p>";
  }
});

// Load comments
function loadComments() {
  commentsDiv.innerHTML = "";

  db.collection("posts").doc(postId)
    .collection("comments")
    .orderBy("timestamp")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const comment = doc.data();
        const div = document.createElement("div");
        div.className = "bg-white p-3 rounded shadow";
        div.innerHTML = `
          <p class="font-semibold">${comment.name}</p>
          <p class="text-sm text-gray-600">${new Date(comment.timestamp?.toDate()).toLocaleString()}</p>
          <p>${comment.text}</p>
        `;
        commentsDiv.appendChild(div);
      });
    });
}
loadComments();

// Handle new comment
document.getElementById("commentForm").onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById("commentName").value;
  const text = document.getElementById("commentText").value;

  await db.collection("posts").doc(postId).collection("comments").add({
    name,
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("commentForm").reset();
  loadComments();
};
