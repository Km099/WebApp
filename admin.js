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

// 🔒 Admin access check
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  db.collection("roles").doc(user.uid).get().then(doc => {
    if (!doc.exists || doc.data().role !== "admin") {
      alert("Access denied. Admins only.");
      location.href = "index.html";
    } else {
      loadPosts();
    }
  });
});

// 📄 Load posts into admin panel
function loadPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
    snapshot.forEach(doc => {
      const post = doc.data();
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded shadow flex justify-between items-center";
      div.innerHTML = `
        <div>
          <h3 class="text-lg font-bold">${post.title}</h3>
          <p class="text-sm text-gray-600">${new Date(post.timestamp?.toDate()).toLocaleString()}</p>
        </div>
        <div class="space-x-2">
          <button onclick="editPost('${doc.id}', \`${post.title}\`, \`${post.content}\`)" class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
          <button onclick="deletePost('${doc.id}')" class="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </div>
      `;
      postList.appendChild(div);
    });
  });
}

// 💾 Handle save/edit post
const form = document.getElementById("postForm");
form.onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById("postId").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (id) {
    // Edit
    db.collection("posts").doc(id).update({
      title, content
    });
  } else {
    // Create
    db.collection("posts").add({
      title,
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  form.reset();
  loadPosts();
};

// ✏️ Edit post handler
function editPost(id, title, content) {
  document.getElementById("postId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
  window.scrollTo(0, 0);
}

// 🗑️ Delete post handler
function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    db.collection("posts").doc(id).delete().then(loadPosts);
  }
}
