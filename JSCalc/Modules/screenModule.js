export function updateScreen(value) {
    const screen = document.getElementById("screen");
    console.log("Updating Screen:", value);
    screen.textContent = value || "0";
  }
  