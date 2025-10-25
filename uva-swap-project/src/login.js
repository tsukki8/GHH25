document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("login-form");

  // Load users.json dynamically
  const res = await fetch("/src/users.json");
  const users = await res.json();

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const foundUser = users.users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      alert("✅ Login successful!");
      localStorage.setItem("loggedInUser", username);
      window.location.href = "profile.html";
    } else {
      alert("❌ Invalid username or password");
    }
  });
});