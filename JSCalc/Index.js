document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.createElement("button");
  let lastOperationWasEqual = false;
  themeToggleBtn.textContent = "Toggle Theme";
  themeToggleBtn.classList.add("theme-toggle");
  document.body.appendChild(themeToggleBtn);
  let firstNumber = null;
  let operator = null;
  let isDegreeMode = true;
  const screen = document.getElementById("screen");
  const historyDisplay = document.getElementById("history");
  const memoryDisplay = document.getElementById("memory");
  let currentInput = "";
  let history = [];
  let memory = 0;
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  let isInverse = false;
  let isHyperbolic = false;
  let isSecondFunction = false;
  let isExponentialMode = false;

  //Degree Button
  document.getElementById("btn-deg").addEventListener("click", function () {
    isDegreeMode = !isDegreeMode;
    this.innerText = isDegreeMode ? "Deg" : "Rad";
  });

  //Key Event Handle
  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (
      (key >= "0" && key <= "9") ||
      key === "." ||
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"
    ) {
      currentInput += key;
      updateScreen(currentInput);
    }
    // Handle Backspace to delete last character
    if (key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      updateScreen(currentInput);
    }
    // Handle Enter to evaluate expression
    if (key === "Enter") {
      try {
        currentInput = eval(currentInput).toString();
        addToHistory(currentInput);
        updateScreen(currentInput);
      } catch (e) {
        currentInput = "Error";
        updateScreen(currentInput);
      }
    }
    // Handle Escape to clear input
    if (key === "Escape") {
      currentInput = "";
      updateScreen("0");
    }
  });

  // Load saved theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    themeToggleBtn.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>`;
    document.body.classList.add("dark-theme");
  } else {
    themeToggleBtn.innerHTML = `<i class="fa-solid fa-circle-half-stroke"></i>`;
  }
  // Theme Toggle
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    // Save theme preference in localStorage
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
  if (menuIcon) {
    menuIcon.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }
  // Update the screen display
  function updateScreen(value) {
    console.log("Updating Screen:", value);
    screen.textContent = value || "0";
  }
  // Add History
  function addToHistory(entry) {
    history.push(entry);
    updateHistoryDisplay();
  }
  // Update history display
  function updateHistoryDisplay() {
    historyDisplay.innerHTML = "";

    history.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.textContent = entry;
      historyDisplay.appendChild(entryDiv);
    });
  }

  // Clear history
  function clearHistory() {
    history = [];
    updateHistoryDisplay();
  }

  // Memory functions
  function memoryClear() {
    memory = 0;
    updateMemoryDisplay();
  }

  function memoryRecall() {
    currentInput = memory.toString();
    updateScreen(currentInput);
  }

  function memoryAdd() {
    memory += parseFloat(currentInput) || 0;
    updateMemoryDisplay();
  }

  function memorySubtract() {
    memory -= parseFloat(currentInput) || 0;
    updateMemoryDisplay();
  }

  function memoryStore() {
    memory = parseFloat(currentInput) || 0;
    updateMemoryDisplay();
  }

  function updateMemoryDisplay() {
    memoryDisplay.textContent = `Memory: ${memory}`;
  }
  // All trigonometries functions are here
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function () {
      let value = this.innerText.trim();
      console.log("Clicked:", value);

      if (value === "2nd" || value === "hyp") {
        event.stopPropagation(); // Prevent dropdown from closing
        isInverse = value === "2nd" ? !isInverse : isInverse;
        isHyperbolic = value === "hyp" ? !isHyperbolic : isHyperbolic;
        updateTrigLabels();
        return;
      }

      let inputValue = parseFloat(currentInput);
      if (isNaN(inputValue)) return;

      // Handling trigonometric function clicks
      if (value.includes("sin")) {
        currentInput = applyTrigFunction("sin", inputValue);
      } else if (value.includes("sin")) {
        currentInput = applyTrigFunction("cos", inputValue);
      } else if (value.includes("tan")) {
        currentInput = applyTrigFunction("tan", inputValue);
      } else if (value.includes("sec")) {
        currentInput = applyTrigFunction("sec", inputValue);
      } else if (value.includes("csc")) {
        currentInput = applyTrigFunction("csc", inputValue);
      } else if (value.includes("cot")) {
        currentInput = applyTrigFunction("cot", inputValue);
      }
      lastOperationWasEqual = true; 

      updateScreen(currentInput);
    });
  });

  function updateTrigLabels() {
    let mappings = {
      "trig-sin": isHyperbolic
        ? isInverse
          ? "sinh⁻¹"
          : "sinh"
        : isInverse
          ? "sin⁻¹"
          : "sin",
      "trig-cos": isHyperbolic
        ? isInverse
          ? "cosh⁻¹"
          : "cosh"
        : isInverse
          ? "cos⁻¹"
          : "cos",
      "trig-tan": isHyperbolic
        ? isInverse
          ? "tanh⁻¹"
          : "tanh"
        : isInverse
          ? "tan⁻¹"
          : "tan",
      "trig-sec": isHyperbolic
        ? isInverse
          ? "sech⁻¹"
          : "sech"
        : isInverse
          ? "sec⁻¹"
          : "sec",
      "trig-csc": isHyperbolic
        ? isInverse
          ? "csch⁻¹"
          : "csch"
        : isInverse
          ? "csc⁻¹"
          : "csc",
      "trig-cot": isHyperbolic
        ? isInverse
          ? "coth⁻¹"
          : "coth"
        : isInverse
          ? "cot⁻¹"
          : "cot",
    };

    Object.entries(mappings).forEach(([id, label]) => {
      document.getElementById(id).textContent = label;
    });
  }

  //Trigo Functions
  function applyTrigFunction(func, value) {
    let angle = isDegreeMode ? value * (Math.PI / 180) : value;

    switch (func) {
      case "sin":
        return isInverse
          ? (isDegreeMode ? Math.asin(value) * (180 / Math.PI) : Math.asin(value))
          : isHyperbolic
            ? Math.sinh(value)
            : Math.sin(angle);
      case "cos":
        return isInverse
          ? (isDegreeMode ? Math.acos(value) * (180 / Math.PI) : Math.acos(value))
          : isHyperbolic
            ? Math.cosh(value)
            : Math.cos(angle);
      case "tan":
        return isInverse
          ? (isDegreeMode ? Math.atan(value) * (180 / Math.PI) : Math.atan(value))
          : isHyperbolic
            ? Math.tanh(value)
            : Math.tan(angle);
      case "sec":
        return isInverse
          ? (isDegreeMode ? Math.acos(1 / value) * (180 / Math.PI) : Math.acos(1 / value))
          : isHyperbolic
            ? 1 / Math.cosh(value)
            : 1 / Math.cos(isDegreeMode ? value * (Math.PI / 180) : value);
      case "csc":
        return isInverse
          ? (isDegreeMode ? Math.asin(1 / value) * (180 / Math.PI) : Math.asin(1 / value))
          : isHyperbolic
            ? 1 / Math.sinh(value)
            : 1 / Math.sin(isDegreeMode ? value * (Math.PI / 180) : value);
      case "cot":
        return isInverse
          ? (isDegreeMode ? Math.atan(1 / value) * (180 / Math.PI) : Math.atan(1 / value))
          : isHyperbolic
            ? 1 / Math.tanh(value)
            : 1 / Math.tan(isDegreeMode ? value * (Math.PI / 180) : value);
      default:
        return value;
    }
  }

  //All functions are here like x, |x|  
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function () {
      let value = this.innerText;
      if (value === "|x|") {
        currentInput = Math.abs(parseFloat(currentInput)).toString();
      } else if (value === "⌊x⌋") {
        currentInput = Math.floor(parseFloat(currentInput)).toString();
      }
      else if (value === "⌈x⌉") {
        currentInput = Math.ceil(parseFloat(currentInput)).toString();
      }
      lastOperationWasEqual = true; 
      updateScreen(currentInput);
    });
  });

  // Handle button clicks
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const value = event.target.textContent;
      console.log(value);

      // Ignore clicks on the "Functions" dropdown button
      if (
        event.target.id === "dropdown-functions" ||
        event.target.id === "dropdown-trigonometry"
      ) {
        return;
      }
      if (value === "Deg" || value === "Rad") {
        updateScreen("0");
      } else if (value === ".") {
        // Prevent multiple decimals in the same number
        let lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes(".")) {
          currentInput += value;
          updateScreen(currentInput);
        }
      } else if (value === "C") {
        currentInput = "";
        updateScreen();
      } else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput);
      } else if (value === "=") {
        try {
          let result;
          let historyEntry = "";

          if (operator === "x^y") {
            if (currentInput === "" || isNaN(currentInput)) {
              updateScreen("Error");
              lastOperationWasEqual = false;
              return;
            }
            let secondNumber = parseFloat(currentInput);
            result = Math.pow(firstNumber, secondNumber);
            historyEntry = `${firstNumber} ^ ${secondNumber} = ${result}`;
          } else if (operator === "y√x") {
            if (currentInput === "" || isNaN(currentInput) || firstNumber < 0) {
              updateScreen("Error");
              lastOperationWasEqual = false;
              return;
            }
            let secondNumber = parseFloat(currentInput);
            result = Math.pow(firstNumber, 1 / secondNumber);
            historyEntry = `${secondNumber}√${firstNumber} = ${result}`;
          } else if (operator === "logᵧx") {
            if (currentInput === "" || isNaN(currentInput) || firstNumber <= 0) {
              updateScreen("Error");
              return;
            }
            let base = parseFloat(currentInput);
            if (base <= 0 || base === 1) {
              updateScreen("Error");
              return;
            }
            result = Math.log(firstNumber) / Math.log(base);
            historyEntry = `log_${base}(${firstNumber}) = ${result}`;
          } else {
            result = eval(currentInput);
            result = parseFloat(result.toFixed(10))
            historyEntry = `${currentInput} = ${result}`;
          }
          addToHistory(historyEntry);
          currentInput = result.toString();
          updateScreen(currentInput);
          lastOperationWasEqual = true;
          firstNumber = result;
          operator = null;
        } catch (error) {
          updateScreen("Error");
          lastOperationWasEqual = false;
        }
      } else if (!isNaN(value) || value === ".") {
        if (lastOperationWasEqual) {
          currentInput = value;
          lastOperationWasEqual = false;
        } else {
          currentInput += value;
        }
        updateScreen(currentInput);
      } else if (["+", "-", "*", "/"].includes(value)) {

        if (lastOperationWasEqual) {
          currentInput = firstNumber + value;
          lastOperationWasEqual = false;
        } else {
          currentInput += value;
        }
        updateScreen(currentInput);
      } else if (value === "M+") {
        memoryAdd();
      } else if (value === "M-") {
        memorySubtract();
      } else if (value === "MC") {
        memoryClear();
      } else if (value === "MR") {
        memoryRecall();
      } else if (value === "MS") {
        memoryStore();
      } else if (value === "n!") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error"); // Invalid input
          return;
        }

        let num = parseFloat(currentInput); // Convert input to a number
        if (num < 0) {
          updateScreen("Error"); // Factorial is not defined for negative numbers
          return;
        }

        // Compute factorial: Standard factorial for integers, Gamma function for floats
        let factorial = (n) => (n % 1 === 0 ? intFactorial(n) : gamma(n + 1));

        let intFactorial = (n) => (n <= 1 ? 1 : n * intFactorial(n - 1)); // Standard factorial

        let gamma = (z) => {
          // Lanczos approximation for Gamma function
          const g = 7;
          const C = [
            0.99999999999980993,
            676.5203681218851,
            -1259.1392167224028,
            771.32342877765313,
            -176.61502916214059,
            12.507343278686905,
            -0.13857109526572012,
            9.9843695780195716e-6,
            1.5056327351493116e-7,
          ];
          if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
          z -= 1;
          let x = C[0];
          for (let i = 1; i < g + 2; i++) x += C[i] / (z + i);
          let t = z + g + 0.5;
          return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
        };

        let result = factorial(num);
        currentInput = result.toString();
        updateScreen(currentInput);
        lastOperationWasEqual = true; 
      } else if (value === "2nd") {
        isSecondFunction = !isSecondFunction;
        if (isSecondFunction) {
          document.getElementById("btn-square").innerHTML = "x³";
          document.getElementById("btn-sqrt").innerHTML = "∛x";
          document.getElementById("btn-power").innerHTML = "y√x";
          document.getElementById("btn-10x").innerHTML = "2^x";
          document.getElementById("btn-log").innerHTML = "logᵧx";
          document.getElementById("btn-ln").innerHTML = "e^x";
        } else {
          document.getElementById("btn-square").innerHTML = "x²";
          document.getElementById("btn-sqrt").innerHTML = "√x";
          document.getElementById("btn-power").innerHTML = "x^y";
          document.getElementById("btn-10x").innerHTML = "10^x";
          document.getElementById("btn-log").innerHTML = "log";
          document.getElementById("btn-ln").innerHTML = "ln";
        }
      } else if (value === "x²" || value === "x³") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error");
          return;
        }

        let num = parseFloat(currentInput);

        if (value === "x³") {
          num = Math.pow(num, 3);
        } else {
          num = Math.pow(num, 2);
        }

        currentInput = num.toString();
        lastOperationWasEqual = true; 
        updateScreen(currentInput);

        console.log("Updated Current Input:", currentInput);
      } else if (value === "x^y" || value === "y√x") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error");
          return;
        }

        firstNumber = parseFloat(currentInput);
        currentInput = "";
        operator = value;
        lastOperationWasEqual = true; 
        updateScreen(firstNumber + (value === "x^y" ? "^" : "√"));

      }
      else if (value === "10^x" || value === "2^x") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error");
          return;
        }

        let num = parseFloat(currentInput);
        console.log(num);

        if (isSecondFunction) {
          currentInput = Math.pow(2, num);
        } else {
          currentInput = Math.pow(10, num);
        }
        lastOperationWasEqual = true; 
        updateScreen(currentInput);
      } else if (value === "log" || value === "logᵧx") {
        if (!isSecondFunction) {
          if (currentInput === "" || isNaN(currentInput)) {
            updateScreen("Error");
            return;
          }
          let num = parseFloat(currentInput);
          if (num <= 0) {
            updateScreen("Error");
            return;
          }
          currentInput = Math.log10(num).toString();
        } else {
          firstNumber = parseFloat(currentInput);
          currentInput = "";
          operator = "logᵧx";
          updateScreen(`logᵧ(${firstNumber})`);
        }
        lastOperationWasEqual = true; 
        updateScreen(currentInput);
      } else if (value === "ln" || value === "e^x") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error");
          return;
        }
        let num = parseFloat(currentInput);
        if (value === "e^x") {
          currentInput = Math.exp(num);
        } else {
          currentInput = Math.log(num).toString();
        }
        lastOperationWasEqual = true; 
        updateScreen(currentInput);
      } else if (value === "π") {
        lastOperationWasEqual = true; 
        currentInput += Math.PI.toString();
        updateScreen(currentInput);
      } else if (value === "e") {
        lastOperationWasEqual = true; 
        currentInput += Math.E.toString();
        updateScreen(currentInput);
      } else if (value === "mod") {
        currentInput += "%";
        lastOperationWasEqual = true; 
        updateScreen(currentInput);
      } else if (value === "÷") {
        currentInput += "/";
        updateScreen(currentInput);
      } else if (value === "|x|") {
        currentInput = Math.abs(parseFloat(currentInput)).toString();
        lastOperationWasEqual = true; 
        updateScreen(currentInput);
      } else if (value === "1/x") {
        try {
          console.log(currentInput);

          if (currentInput === "" || isNaN(currentInput)) {
            updateScreen("Error");
            return;
          }

          let num = parseFloat(currentInput);
          console.log(num);

          if (num === 0) {
            updateScreen("Error");
          } else {
            currentInput = 1 / num;
            console.log(currentInput);
            lastOperationWasEqual = true; 
            updateScreen(currentInput);
          }
        } catch (error) {
          updateScreen("Error");
        }
      } else if (value === "X") {
        currentInput += "*";
        updateScreen(currentInput);
      } else if (value === "+/-") {
        if (currentInput.length > 0) {
          if (currentInput === "0") return;

          currentInput = currentInput.startsWith("-")
            ? currentInput.substring(1)
            : "-" + currentInput;
          updateScreen(currentInput);
        } else if (expression.length > 0) {
          let numberIndex = -1;
          let numberToNegate = null;
          let numberRegex = /[-+]?\d+(\.\d+)?/g;
          let matches = [];
          let match;
          while ((match = numberRegex.exec(expression)) !== null) {
            matches.push({
              value: match[0],
              index: match.index,
            });
          }

          if (matches.length > 0) {
            numberToNegate = matches[matches.length - 1];
            numberIndex = numberToNegate.index;
          }

          if (numberToNegate) {
            let newNumber = numberToNegate.value.startsWith("-")
              ? numberToNegate.value.substring(1)
              : "-" + numberToNegate.value;

            expression =
              expression.substring(0, numberIndex) +
              newNumber +
              expression.substring(numberIndex + numberToNegate.value.length);
            updateScreen(expression);
          }

          let lastBracketMatch = expression.match(/\([^\(\)]+?\)$/);
          if (lastBracketMatch) {
            let lastBracketContent = lastBracketMatch[0];
            let startIndex = expression.lastIndexOf(lastBracketContent);

            let negatedExpression =
              lastBracketContent.startsWith("-")
                ? lastBracketContent.substring(1)
                : "-" + lastBracketContent;

            expression =
              expression.substring(0, startIndex) +
              negatedExpression +
              expression.substring(startIndex + lastBracketContent.length);
            updateScreen(expression);
          }
        }
      } else if (value === "exp") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error");
          lastOperationWasEqual = true; 
          return;
        } else if (value === "0") {
          let num = parseFloat(currentInput);
          currentInput = Number(num).toExponential().toString
        }
        let num = parseFloat(currentInput);
        currentInput = Number(num).toExponential().toString();
        updateScreen(currentInput);
      } else if (value === "−") {
        currentInput += "-";
        updateScreen(currentInput);
      } else if (value === "+") {
        currentInput += "+";
        updateScreen(currentInput);
      } else if (value === "F-E") {
        if (currentInput === "" || isNaN(currentInput)) {
          updateScreen("Error");
          return;
        }
        let num = parseFloat(currentInput);
        if (isExponentialMode) {
          currentInput = num.toString();
        } else {
          currentInput = num.toExponential();
        }
        isExponentialMode = !isExponentialMode;
        updateScreen(currentInput);
      } else {
        currentInput += value;
        lastOperationWasEqual = true; 
        updateScreen(currentInput);
      }
    });
  });

});