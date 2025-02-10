let history = [];

export function addToHistory(entry) {
  history.push(entry);
  updateHistoryDisplay();
}

export function updateHistoryDisplay() {
  const historyDisplay = document.getElementById("history");
  historyDisplay.innerHTML = "";
  
  history.forEach((entry) => {
    const entryDiv = document.createElement("div");
    entryDiv.textContent = entry;
    historyDisplay.appendChild(entryDiv);
  });
}

export function clearHistory() {
  history = [];
  updateHistoryDisplay();
}
