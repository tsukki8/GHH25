import './style.css';
import { clothingListings } from './clothingListings.js';

const app = document.querySelector('#app');

// Prepare gallery HTML
const galleryHTML = clothingListings.map(item => `
  <div class="card">
    <img src="${item.image}" alt="${item.title}">
    <h3>${item.title}</h3>
    <p>Owner: ${item.owner}</p>
  </div>
`).join('');

// Duplicate the gallery so it can loop seamlessly
app.innerHTML = `
  <div class="gallery">
    ${galleryHTML}
    ${galleryHTML} <!-- duplicate for smooth infinite scroll -->
  </div>

  <div class="overlay">
    <h1>SwapMates</h1>
    <a href="login.html"><button>Login</button></a>
  </div>
`;

