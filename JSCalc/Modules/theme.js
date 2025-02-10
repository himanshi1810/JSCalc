export function createThemeToggleButton() {
    const themeToggleBtn = document.createElement("button");
    themeToggleBtn.textContent = "Toggle Theme";
    themeToggleBtn.classList.add("theme-toggle");
  
    // Load saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
      document.body.classList.add("dark-theme");
    } else {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
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
  
    return themeToggleBtn;
  }
  
  export function setupMenuToggle(menuIcon, navLinks) {
    if (menuIcon) {
      menuIcon.addEventListener("click", function () {
        navLinks.classList.toggle("show");
      });
    }
  }