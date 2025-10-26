//import the user 
import User from "./User.js";

// Make header clickable to go back to search page
document.addEventListener("DOMContentLoaded", () => {
    const homeTitle = document.getElementById("homeTitle");
    if (homeTitle) {
        homeTitle.addEventListener("click", () => {
            window.location.href = "searchPage.html";
        });
    }

    const profilePic = document.getElementById("profilePicture");
    const profileName = document.getElementById("profileName");
    const profileBio = document.getElementById("profileBio");

    if (currentUser.pfp) profilePic.src = currentUser.pfp;
    profileName.textContent = currentUser.username;
    profileBio.textContent = currentUser.bio;

    // Optional: make profile icon clickable (if needed)
    const profileIcon = document.querySelector(".profile-icon");
    if (profileIcon) {
        profileIcon.addEventListener("click", () => {
            window.location.href = "profile.html"; // Or any other page
        });
    }
});
