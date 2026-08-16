const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initGame();

function initGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  resetBtn.addEventListener("click", resetGame);
  themeToggle.addEventListener("click", toggleTheme);
  running = true;
}

function cellClicked() {
  const index = this.dataset.index;
  if (options[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  let winner = null;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      winner = options[a];
      highlightCells(pattern);
      break;
    }
  }

  if (winner) {
    statusText.textContent = `🎉 Player ${winner} Wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "🤝 It's a Tie!";
    running = false;
  } else {
    changePlayer();
  }
}

function highlightCells(pattern) {
  pattern.forEach(i => {
    cells[i].style.boxShadow = "0 0 15px lime";
  });
}

function resetGame() {
  options.fill("");
  currentPlayer = "X";
  running = true;
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.style.boxShadow = "none";
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("light")) {
    icon.classList.replace("ri-sun-line", "ri-moon-line");
  } else {
    icon.classList.replace("ri-moon-line", "ri-sun-line");
  }
}
