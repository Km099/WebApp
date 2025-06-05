// Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load posts
const postsContainer = document.getElementById("posts");
db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
  snapshot.forEach(doc => {
    const post = doc.data();
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
