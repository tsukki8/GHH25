import './style.css';
import { artListing } from './artListing.js';

const app = document.querySelector('#app');

// Settings
const cardWidth = 200;          // width of each card in px
const cardGap = 10;             // gap between cards in px
const repeatFactor = 5;         // how many times to duplicate images per column

// Calculate number of columns that fit the screen width
const columnsCount = Math.ceil(window.innerWidth / (cardWidth + cardGap));

// Duplicate listings to fill column height
function getRepeatedListings() {
  const repeated = [];
  for (let i = 0; i < repeatFactor; i++) {
    repeated.push(...artListing);
  }
  return repeated;
}

const repeatedListings = getRepeatedListings();
const columnHeight = Math.ceil(repeatedListings.length / columnsCount);

// Build HTML for columns
let columnsHTML = '';
for (let c = 0; c < columnsCount; c++) {
  const start = c * columnHeight;
  const end = start + columnHeight;
  const columnItems = repeatedListings.slice(start, end);

  // Each column gets a small negative animation delay to stagger the scroll
  columnsHTML += `
    <div class="gallery-column" style="animation-delay: -${c * 3}s">
      ${columnItems.map(item => `
        <div class="card">
          <picture>
            <source srcset="${item.image}" type="image/avif">
            <img src="${item.image}" alt="${item.title}">
          </picture>
          <h3>${item.title}</h3>
          <p>Owner: ${item.owner}</p>
        </div>
      `).join('')}
    </div>
  `;
}

app.innerHTML = columnsHTML;

// Optional: update columns on window resize
window.addEventListener('resize', () => {
  location.reload(); // simple way to recalc columns for new screen size
});

