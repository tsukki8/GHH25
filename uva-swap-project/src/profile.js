// Make header clickable to go back to search page
document.addEventListener("DOMContentLoaded", () => {
    const homeTitle = document.getElementById("homeTitle");
    if (homeTitle) {
        homeTitle.addEventListener("click", () => {
            window.location.href = "searchPage.html";
        });
    }

    // Optional: make profile icon clickable (if needed)
    const profileIcon = document.querySelector(".profile-icon");
    if (profileIcon) {
        profileIcon.addEventListener("click", () => {
            window.location.href = "profile.html"; // Or any other page
        });
    }
});
