const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page reload

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Username:', username);
  console.log('Password:', password);

  alert(`Logging in as ${username}`);
});
