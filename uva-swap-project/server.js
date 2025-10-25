const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";
const loadUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

// ✅ LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.json({ message: "Login successful", username });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
