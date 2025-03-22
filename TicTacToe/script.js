// Game Object to Encapsulate Logic
const TicTacToe = {
    cells: {},
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    clicked: 0,
    winningCombinations: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
  
    // Initialize the Game
    init() {
      this.namingAllCells();
      this.addEventListeners();
    },
  
    // Assign Cell Elements to the `cells` Object
    namingAllCells() {
      for (let i = 1; i <= 9; i++) {
        this.cells[`cell${i}`] = document.getElementById(`cell${i}`);
      }
    },
  
    // Add Event Listeners to Each Cell
    addEventListeners() {
      Object.values(this.cells).forEach((cell) => {
        cell.addEventListener("click", () => this.handleCellClick(cell));
      });
    },
  
    // Handle a Cell Click
    handleCellClick(cell) {
      if (!cell.innerHTML) {
        const currentPlayer = this.clicked % 2 === 0 ? "X" : "O";
        cell.innerHTML = currentPlayer;
  
        const cellNumber = parseInt(cell.id.replace("cell", "")) - 1;
        const rowNumber = Math.floor(cellNumber / 3);
        const colNumber = cellNumber % 3;
  
        this.board[rowNumber][colNumber] = currentPlayer;
        this.clicked++;
  
        if (this.clicked >= 5) {
          this.checkResults();
        }
      }
    },
  
    // Check for a Winner or Draw
    checkResults() {
      const xPositions = this.findIndexes("X");
      const oPositions = this.findIndexes("O");
      let winner = null;
  
      this.winningCombinations.forEach((combination) => {
        if (combination.every((pos) => xPositions.includes(pos))) {
          winner = "X";
        }
        if (combination.every((pos) => oPositions.includes(pos))) {
          winner = "O";
        }
      });
  
      if (winner) {
        alert('Winner is '+ winner)
        this.clearBoard();
      } else if (this.clicked === 9) {
        alert("It is a draw!");
        this.clearBoard();
      }
    },

  
    // Find All Positions of a Player's Symbol
    findIndexes(player) {
      const flatBoard = this.board.flat();
      return flatBoard
        .map((value, index) => (value === player ? index : null))
        .filter((value) => value !== null);
    },
  
    // Clear the Board and Reset the Game
    clearBoard() {
      this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      this.clicked = 0;
      Object.values(this.cells).forEach((cell) => {
        cell.innerHTML = "";
      });
    },
  };
  
  // Initialize the Game
  TicTacToe.init();