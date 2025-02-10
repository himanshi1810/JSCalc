
export function createThemeToggleButton() {
  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.classList.add("theme-toggle");

  // Set initial theme state
  setInitialTheme(themeToggleBtn);

  // Add event listener for theme toggling
  themeToggleBtn.addEventListener("click", toggleTheme);

  return themeToggleBtn;
}

function setInitialTheme(button) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }
  button.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>`;
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}
export function setupMenuToggle() {
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");

  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }
}
