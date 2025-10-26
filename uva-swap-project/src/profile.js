import Artwork from "./Artwork.js";
import artworks from "./listings.json" assert { type: "json" };

// Convert plain JSON objects to Artwork instances
const artworkObjects = artworks.map(a => new Artwork(a));

// Select the container where listings will be displayed
const itemsContainer = document.getElementById("itemsContainer");

// Filter artworks by ownerId = 1
const userArtworks = artworkObjects.filter(art => art.ownerId === 1);

// Render function
function renderArtworks(list) {
  itemsContainer.innerHTML = "";

  if (!list || list.length === 0) {
    itemsContainer.innerHTML = "<p>No listings found for this user.</p>";
    return;
  }

  list.forEach(art => {
    const div = document.createElement("div");
    div.classList.add("listing");
    div.innerHTML = `
      <img src="${art.image || '/images/placeholder.jpg'}"
           alt="${art.title}"
           onerror="this.onerror=null; this.src='/images/placeholder.jpg';" />
      <h3>${art.title}</h3>
      <p>${art.description}</p>
      <p>Status: ${art.getStatus()}</p>
      <p>Created: ${art.getCreationTime()}</p>
    `;
    itemsContainer.appendChild(div);
  });
}

// Make header clickable to go back to search page
document.addEventListener("DOMContentLoaded", () => {
  const homeTitle = document.getElementById("homeTitle");
  if (homeTitle) {
    homeTitle.style.cursor = "pointer";
    homeTitle.addEventListener("click", () => {
      window.location.href = "searchPage.html";
    });
  }

  const profilePic = document.getElementById("profilePicture");
  const profileName = document.getElementById("profileName");
  const profileBio = document.getElementById("profileBio");

  // Dummy user until your login system sets it dynamically
  const currentUser = {
    username: "Ashley",
    bio: "Nice to meet you!",
    pfp: "/images/ashleyIcon.jpg"
  };

  if (profilePic) profilePic.src = currentUser.pfp;
  if (profileName) profileName.textContent = currentUser.username;
  if (profileBio) profileBio.textContent = currentUser.bio;

  // Render only user's artworks
  renderArtworks(userArtworks);
});

