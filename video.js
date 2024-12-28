let user = null; // Track logged-in user
let videos = []; // Store uploaded videos
let likedVideos = []; // Store liked videos

// Login/Signup Logic
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  if (username) {
    user = username;
    alert(`Welcome, ${username}!`);
    document.getElementById("login-signup").classList.add("hidden");
    document.getElementById("video-feed").classList.remove("hidden");
  }
});

// Upload Video
document.getElementById("upload-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("video-title").value;
  const description = document.getElementById("video-description").value;
  const file = document.getElementById("video-file").files[0];

  if (title && file) {
    const video = {
      id: videos.length + 1,
      title,
      description,
      fileURL: URL.createObjectURL(file),
      likes: 0,
    };
    videos.push(video);
    alert("Video uploaded successfully!");
  }
});

// Display Videos
function displayVideos() {
  const container = document.getElementById("videos-container");
  if (container) {
    container.innerHTML = "";
    videos.forEach((video) => {
      const videoElement = document.createElement("div");
      videoElement.classList.add("video");
      videoElement.innerHTML = `
        <h3>${video.title}</h3>
        <video src="${video.fileURL}" controls></video>
        <button onclick="likeVideo(${video.id})">Like (${video.likes})</button>
      `;
      container.appendChild(videoElement);
    });
  }
}

// Like Video
function likeVideo(videoId) {
  const video = videos.find((v) => v.id === videoId);
  if (video) {
    video.likes++;
    likedVideos.push(video);
    displayVideos();
  }
}

// Search Videos
document.getElementById("search-btn")?.addEventListener("click", () => {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filtered = videos.filter((v) => v.title.toLowerCase().includes(query));
  displayVideos(filtered);
});
