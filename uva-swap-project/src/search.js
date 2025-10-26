// ✅ 1️⃣ Import data and engine
import { artworks } from "./mockListings.js";
import ArtworkSearchEngine from "./ArtworkSearchEngine.js";

// ✅ 2️⃣ Setup
const searchEngine = new ArtworkSearchEngine();

// ✅ 3️⃣ UI elements
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const creationTimeFilter = document.getElementById("creationTimeFilter");
const itemsContainer = document.getElementById("itemsContainer");

// Track selected category (optional)
let selectedCategory = null;

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
            <h3>${art.title}</h3>
            <p>${art.description}</p>
            <p>Status: ${art.getStatus()}</p>
            <p>Created: ${art.getCreationTime()}</p>
        `;
        itemsContainer.appendChild(div);
    });
}


// ✅ Show everything on page load
renderArtworks(artworks);

// ✅ Prevent the form from reloading the page on submit
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("searchButton").click();
});

// ✅ Search button click event
document.getElementById("searchButton").addEventListener("click", () => {
    console.log("🔍 Search button clicked!"); // debugging

    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value === "true",
        creationTime: creationTimeFilter.value || null
    };

    console.log("Filters:", filters); // debugging

    const filtered = searchEngine.filterArtworks(artworks, filters);
    console.log("Filtered results:", filtered); // debugging

    renderArtworks(filtered);
});


// ✅ 6️⃣ Category button filtering
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;

    // update button UI
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filters = {
      keyword: searchInput.value.trim(),
      category: selectedCategory,
      status: statusFilter.value === "" ? null : statusFilter.value === "true",
      creationTime: creationTimeFilter.value || null
    };

    const filtered = searchEngine.filterArtworks(artworks, filters);
    renderArtworks(filtered);
  });
});