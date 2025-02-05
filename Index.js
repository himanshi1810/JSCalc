document.addEventListener("DOMContentLoaded", function () {
    const themeToggleBtn = document.createElement("button");
    themeToggleBtn.textContent = "Toggle Theme";
    themeToggleBtn.classList.add("theme-toggle");
    document.body.appendChild(themeToggleBtn);

    // Load saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        // Save theme preference in localStorage
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Navbar Toggle
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    if (menuIcon) {
        menuIcon.addEventListener("click", function () {
            navLinks.classList.toggle("show");
        });
    }
});

