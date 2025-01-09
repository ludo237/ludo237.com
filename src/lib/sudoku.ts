// Helper function to check if a number can be placed in a cell
export function isValid(
  board: SudokuBoard,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
}

// Function to generate a complete Sudoku board
function generateCompleteBoard(): SudokuBoard {
  const board: SudokuBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Fill diagonal boxes first (they're independent of each other)
  for (let box = 0; box < 9; box += 3) {
    fillBox(board, box, box);
  }

  // Fill remaining cells
  fillRemaining(board, 0, 3);
  return board;
}

// Helper to fill a 3x3 box
function fillBox(board: SudokuBoard, row: number, col: number): void {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let index = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[row + i][col + j] = nums[index++];
    }
  }
}

// Helper to fill remaining cells
function fillRemaining(board: SudokuBoard, i: number, j: number): boolean {
  if (j >= 9 && i < 8) {
    i++;
    j = 0;
  }
  if (i >= 9 && j >= 9) return true;
  if (i < 3) {
    if (j < 3) j = 3;
  } else if (i < 6) {
    if (j === Math.floor(i / 3) * 3) j += 3;
  } else {
    if (j === 6) {
      i++;
      j = 0;
      if (i >= 9) return true;
    }
  }

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, i, j, num)) {
      board[i][j] = num;
      if (fillRemaining(board, i, j + 1)) return true;
      board[i][j] = 0;
    }
  }
  return false;
}

// Helper to shuffle array
function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
  let board = generateCompleteBoard();
  let isValid = false;

  while (!isValid) {
    board = generateCompleteBoard();
    isValid = validateBoard(board);
  }

  return removeDigits(board, difficulty);
}

function validateBoard(board: SudokuBoard): boolean {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) {
        if (seen.has(board[row][col])) return false;
        seen.add(board[row][col]);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      if (board[row][col] !== 0) {
        if (seen.has(board[row][col])) return false;
        seen.add(board[row][col]);
      }
    }
  }

  // Check boxes
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const seen = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const value = board[boxRow + i][boxCol + j];
          if (value !== 0) {
            if (seen.has(value)) return false;
            seen.add(value);
          }
        }
      }
    }
  }

  return true;
}
