// Helper function to check if a number can be placed in a cell
export function isValid(
  board: SudokuBoard,
  row: number,
  col: number,
  num: number
): boolean {
  for (let x = 0; x < 9; x++) {
    if (
      board[row][x] === num ||
      board[x][col] === num ||
      board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
        3 * Math.floor(col / 3) + (x % 3)
      ] === num
    ) {
      return false;
    }
  }
  return true;
}

// Backtracking function to fill the Sudoku board
function fillBoard(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Function to generate a complete Sudoku board
function generateCompleteBoard(): SudokuBoard {
  const board: SudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// Function to remove digits from the board based on difficulty
function removeDigits(board: SudokuBoard, difficulty: string): SudokuBoard {
  let attempts: number;
  switch (difficulty) {
    case 'easy':
      attempts = 35;
      break;
    case 'medium':
      attempts = 45;
      break;
    case 'hard':
      attempts = 55;
      break;
    default:
      attempts = 35;
  }

  while (attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    while (board[row][col] === 0) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    board[row][col] = 0;
    attempts--;
  }
  return board;
}

// Function to generate a Sudoku puzzle with a given difficulty
export function generateSudoku(difficulty: string): SudokuBoard {
  const completeBoard = generateCompleteBoard();
  return removeDigits(completeBoard, difficulty);
}
