/*import listings from "./listings.json" assert { type: "json" };
import users from "./users.json" assert { type: "json" };
import Artwork from "./Artwork.js"; // Make sure this path is correct
import ArtworkSearchEngine from "./ArtworkSearchEngine.js";

const searchEngine = new ArtworkSearchEngine();

// ---- Convert JSON mock data into Artwork objects ----
const artworks = listings.map(item => {
  const art = new Artwork(
    item.ownerId,
    item.status,
    item.creationTime,
    new Date(item.dateAdded)
  );

  art.id = item.id;
  art.title = item.title;
  art.image = item.image;
  art.category = item.category;
  art.description = item.description ?? "";

  const owner = users.find(u => u.id === item.ownerId);
  art.ownerName = owner ? owner.displayName : "Unknown User";

  return art;
});

// ---- DOM Elements ----
const searchInput = document.getElementById("searchInput");
const itemsContainer = document.getElementById("itemsContainer");
const statusFilter = document.getElementById("statusFilter");
const creationTimeFilter = document.getElementById("creationTimeFilter");
const categoryButtons = document.querySelectorAll(".category-btn");

// ---- Default Filters ----
const filters = {
  keyword: "",
  status: "",
  category: "",
  creationTime: ""
};

// ---- Render Results ----
function renderResults(results = artworks) {
  if (!results.length) {
    itemsContainer.innerHTML = `<p style="text-align:center; color:#777;">No artworks found.</p>`;
    return;
  }

  itemsContainer.innerHTML = results
    .map(
      item => `
      <div class="card">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-info">
          <h3>${item.title}</h3>
          <p><strong>Artist:</strong> ${item.ownerName}</p>
          <p><strong>Category:</strong> ${item.category}</p>
          <p><strong>Status:</strong> ${
            item.isAvailable() ? "Available ✅" : "Pending ⏳"
          }</p>
        </div>
      </div>
    `
    )
    .join("");
}

// ---- Initial Load ----
renderResults();

// ---- Apply Filters ----
function applyFilters() {
  const results = searchEngine.filterArtworks(artworks, filters);
  renderResults(results);
}

// ---- Event Listeners ----

// Search input triggers automatically
searchInput.addEventListener("input", () => {
  filters.keyword = searchInput.value.trim();
  applyFilters();
});

// Dropdown filters
statusFilter.addEventListener("change", () => {
  filters.status =
    statusFilter.value === ""
      ? null
      : statusFilter.value === "true";
  applyFilters();
});

creationTimeFilter.addEventListener("change", () => {
  filters.creationTime = creationTimeFilter.value;
  applyFilters();
});

// Category buttons
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.category = btn.dataset.category;
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
  });
});
*/

// ✅ 1️⃣ Import data and engine
import ArtworkSearchEngine from "./ArtworkSearchEngine.js";
import Artwork from "./Artwork.js";
import artworks from "./listings.json" assert { type: "json" };

// ✅ 2️⃣ Setup
const searchEngine = new ArtworkSearchEngine();

// Convert plain JSON objects to Artwork instances
const artworkObjects = artworks.map(a => new Artwork(a));

// ✅ 3️⃣ UI elements
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const creationTimeFilter = document.getElementById("creationTimeFilter");
const itemsContainer = document.getElementById("itemsContainer");
let selectedCategory = null; // Track selected category

// ✅ Render Function
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

// ✅ Show all on page load
renderArtworks(artworkObjects);

// ✅ Prevent the form from reloading the page on submit
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("searchButton").click();
});

// ✅ Search button click event
document.getElementById("searchButton").addEventListener("click", () => {
    console.log("🔍 Search button clicked!");

    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value === "true",
        creationTime: creationTimeFilter.value || null
    };

    console.log("Filters:", filters);

    // ✅ Filter using Artwork instances (not raw JSON)
    const filtered = searchEngine.filterArtworks(artworkObjects, filters);
    console.log("Filtered results:", filtered);

    renderArtworks(filtered);
});

// ✅ 6️⃣ Category button filtering
document.querySelectorAll(".category-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;

    // Update active category button styling
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filters = {
        keyword: searchInput.value.trim(),
        category: selectedCategory,
        status: statusFilter.value === "" ? null : statusFilter.value === "true",
        creationTime: creationTimeFilter.value || null
    };

    // ✅ Also use Artwork instances here
    const filtered = searchEngine.filterArtworks(artworkObjects, filters);
    renderArtworks(filtered);
  });
});
