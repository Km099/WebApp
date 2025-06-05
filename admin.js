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

const form = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('postId');
const postList = document.getElementById('postList');

// Submit Form
form.onsubmit = async (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const content = contentInput.value;
  const postId = postIdInput.value;

  if (postId) {
    await db.collection("posts").doc(postId).update({ title, content });
  } else {
    await db.collection("posts").add({
      title,
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  form.reset();
  loadPosts();
};

function loadPosts() {
  postList.innerHTML = "";
  db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
    snapshot.forEach(doc => {
      const post = doc.data();
      const div = document.createElement("div");
      div.className = "bg-white p-3 rounded shadow flex justify-between items-center";
      div.innerHTML = `
        <div>
          <h2 class="font-bold">${post.title}</h2>
          <p class="text-sm text-gray-600">${new Date(post.timestamp?.toDate()).toLocaleString()}</p>
        </div>
        <div class="space-x-2">
          <button onclick="editPost('${doc.id}', \`${post.title}\`, \`${post.content}\`)" class="text-blue-600">Edit</button>
          <button onclick="deletePost('${doc.id}')" class="text-red-600">Delete</button>
        </div>
      `;
      postList.appendChild(div);
    });
  });
}

function editPost(id, title, content) {
  postIdInput.value = id;
  titleInput.value = title;
  contentInput.value = content;
}

function deletePost(id) {
  if (confirm("Delete this post?")) {
    db.collection("posts").doc(id).delete().then(loadPosts);
  }
}

loadPosts();
