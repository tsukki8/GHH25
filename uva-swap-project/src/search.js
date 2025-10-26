// Import data and engine
import ArtworkSearchEngine from "./ArtworkSearchEngine.js";
import Artwork from "./Artwork.js";
import artworks from "./listings.json" assert { type: "json" };

// Setup
const searchEngine = new ArtworkSearchEngine();

// Convert plain JSON objects to Artwork instances
const artworkObjects = artworks.map(a => new Artwork(a));

// UI elements
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const creationTimeFilter = document.getElementById("creationTimeFilter");
const itemsContainer = document.getElementById("itemsContainer");
let selectedCategory = null; // Track selected category

// Render Function
function renderArtworks(list) {
    itemsContainer.innerHTML = "";

    if (!list || list.length === 0) {
        itemsContainer.innerHTML = "<p>No results found.</p>";
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

// Show all on page load
renderArtworks(artworkObjects);

// Prevent the form from reloading the page on submit
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("searchButton").click();
});

// Search button click event
document.getElementById("searchButton").addEventListener("click", () => {
    console.log("🔍 Search button clicked!");

    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value,
        creationTime: creationTimeFilter.value === "" ? null : creationTimeFilter.value
    };

    console.log("Filters:", filters);

    // Filter using Artwork instances (not raw JSON)
    const filtered = searchEngine.filterArtworks(artworkObjects, filters);
    console.log("Filtered results:", filtered);

    renderArtworks(filtered);
});

// 6️⃣ Category button filtering
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;

    // Update active category button styling
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value,
        creationTime: creationTimeFilter.value === "" ? null : creationTimeFilter.value
    };

    // Also use Artwork instances here
    const filtered = searchEngine.filterArtworks(artworkObjects, filters);
    renderArtworks(filtered);
  });
});

// Button that leads to Profile 
document.querySelector(".profile-icon").addEventListener("click", () => {
  window.location.href = "profile.html";
});


// Trigger filtering when status dropdown changes
statusFilter.addEventListener("change", () => {
    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value,
        creationTime: creationTimeFilter.value === "" ? null : creationTimeFilter.value
    };
    const filtered = searchEngine.filterArtworks(artworkObjects, filters);
    renderArtworks(filtered);
});

// Trigger filtering when creation time dropdown changes
creationTimeFilter.addEventListener("change", () => {
    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value,
        creationTime: creationTimeFilter.value === "" ? null : creationTimeFilter.value
    };
    const filtered = searchEngine.filterArtworks(artworkObjects, filters);
    renderArtworks(filtered);
});
//button that leads to Search 
document.getElementById("homeTitle").addEventListener("click", () => {
  window.location.href = "searchPage.html";
});