const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "profile.html"; // ✅ redirect after login
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Login failed. Check server.");
  }
});
