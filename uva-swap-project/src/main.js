import './style.css';

// Example: add event listener to login button
const loginButton = document.querySelector('#app a button');
if (loginButton) {
  loginButton.addEventListener('click', () => {
    console.log('Navigating to login.html');
  });
}

