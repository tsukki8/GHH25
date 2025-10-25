import users from "/users.json";

// Authentication function
function authenticate(username, password) {
  return users.some(
    user => user.username === username && user.password === password
  );
}

// Handle form submit instead of clicking button
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Stop form from refreshing page

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (authenticate(username, password)) {
    alert("✅ Login successful!");
    // redirect or show home page UI
    window.location.href = "/home.html";
  } else {
    alert("❌ Invalid username or password");
  }
});
