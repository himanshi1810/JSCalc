import { updateScreen } from "./screenModule.js";

let memory = 0;
let currentInput = "";

export function memoryClear() {
  memory = 0;
  updateMemoryDisplay();
}

export function memoryRecall() {
  currentInput = memory.toString();
  updateScreen(currentInput);
}

export function memoryAdd() {
  memory += parseFloat(currentInput) || 0;
  updateMemoryDisplay();
}

export function memorySubtract() {
  memory -= parseFloat(currentInput) || 0;
  updateMemoryDisplay();
}

export function memoryStore() {
  memory = parseFloat(currentInput) || 0;
  updateMemoryDisplay();
}

function updateMemoryDisplay() {
  const memoryDisplay = document.getElementById("memory");
  memoryDisplay.textContent = `Memory: ${memory}`;
}
