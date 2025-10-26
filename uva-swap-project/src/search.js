import listings from "./listings.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };
import Artwork from "./Artwork.js"; // Make sure this path is correct
import ArtworkSearchEngine from "./ArtworkSearchEngine.js";

const searchEngine = new ArtworkSearchEngine();

// Convert JSON mock objects → Artwork instances + attach owner info
const artworks = listings.map(item => {
    const art = new Artwork(
        item.ownerId,
        item.status,
        item.creationTime,
        new Date(item.dateAdded)
    );

    // Add listing-specific extra fields
    art.id = item.id;
    art.title = item.title;
    art.image = item.image;
    art.category = item.category;
    art.description = item.description ?? "";

    // Attach owner name from users.json
    const owner = users.find(u => u.id === item.ownerId);
    art.ownerName = owner ? owner.displayName : "Unknown User";

    return art;
});

// DOM elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const itemsContainer = document.getElementById("itemsContainer");
const statusFilter = document.getElementById("statusFilter");
const creationTimeFilter = document.getElementById("creationTimeFilter");
const categoryButtons = document.querySelectorAll(".category-btn");

// Default filters object
const filters = {
    keyword: "",
    status: "",
    category: "",
    creationTime: ""
};

// Render function
function renderResults(results = artworks) {
    itemsContainer.innerHTML = results.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p><strong>Artist:</strong> ${item.ownerName}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Status:</strong> ${item.isAvailable() ? "Available ✅" : "Pending ⏳"}</p>
        </div>
    `).join("");
}

// Initial load
renderResults();

function applyFilters() {
    const results = searchEngine.filterArtworks(artworks, filters);
    renderResults(results);
}

// Events
searchButton.addEventListener("click", () => {
    filters.keyword = searchInput.value;
    applyFilters();
});

statusFilter.addEventListener("change", () => {
    filters.status = statusFilter.value === "" ? null : (statusFilter.value === "true");
    applyFilters();
});

creationTimeFilter.addEventListener("change", () => {
    filters.creationTime = creationTimeFilter.value;
    applyFilters();
});

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.category = btn.dataset.category;
        applyFilters();
    });
});
