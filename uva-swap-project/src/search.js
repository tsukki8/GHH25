import listings from "./listings.json" assert { type: "json" };
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