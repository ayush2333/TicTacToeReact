document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.querySelector(".splash-screen");
    const usernameScreen = document.querySelector(".username-screen");
    const gameScreen = document.querySelector(".game-screen");
    const playerName = document.querySelector("#player-name");
    const usernameForm = document.querySelector("#username-form");
    const usernameInput = document.querySelector("#username-input");
    const board = document.querySelector(".board");
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.querySelector("#game-status");
    const restartBtn = document.querySelector("#restart-btn");
  
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
  
    // Splash Screen Logic
    setTimeout(() => {
      splashScreen.classList.add("exit");
      splashScreen.addEventListener("animationend", () => {
        splashScreen.style.display = "none";
        usernameScreen.style.display = "block";
      });
    }, 3000);
  
    // Handle Username Form
    usernameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = usernameInput.value;
      playerName.textContent = `Welcome, ${name}!`;
      usernameScreen.style.display = "none";
      gameScreen.style.display = "block";
    });
  
    // Handle Cell Click
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if (boardState[index] !== "" || !gameActive) return;
  
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");
  
        checkWinner();
        if (gameActive) computerMove();
      });
    });
  
    // Computer Move
    function computerMove() {
      let emptyCells = boardState.map((val, i) => (val === "" ? i : null)).filter((i) => i !== null);
      if (emptyCells.length === 0) return;
  
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      boardState[randomIndex] = "O";
      cells[randomIndex].textContent = "O";
      cells[randomIndex].classList.add("taken");
  
      checkWinner();
    }
  
    // Check Winner
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          gameActive = false;
          gameStatus.textContent = `${boardState[a]} Wins!`;
          restartBtn.classList.remove("hidden");
          return;
        }
      }
  
      if (!boardState.includes("")) {
        gameActive = false;
        gameStatus.textContent = "It's a Draw!";
        restartBtn.classList.remove("hidden");
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  
    // Restart Game
    restartBtn.addEventListener("click", () => {
      boardState = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
      });
      gameStatus.textContent = "";
      restartBtn.classList.add("hidden");
    });
  });
  