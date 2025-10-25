import './style.css';
import { clothingListings } from './clothingListings.js';

const app = document.querySelector('#app');

const numColumns = 7; // how many columns you want
let columnsHTML = '';

// Split items roughly equally into columns
for (let i = 0; i < numColumns; i++) {
  const columnItems = clothingListings
    .filter((_, index) => index % numColumns === i) // assign items to this column
    .map(item => `
      <div class="card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Owner: ${item.owner}</p>
      </div>
    `).join('');

  // duplicate column items for smooth scroll
  const repeatedColumn = columnItems.repeat(4);

  columnsHTML += `<div class="gallery-column">${repeatedColumn}</div>`;
}

app.innerHTML = `
  <div class="gallery">
    ${columnsHTML}
  </div>

  <div class="overlay">
    <h1>SwapMates</h1>
    <a href="login.html"><button>Login</button></a>
  </div>
`;
