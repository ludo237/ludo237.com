'use client';

import React, { useEffect, useState } from 'react';
import { SudokuBoard } from '~/components/sudoku/Board';
import { DifficultySelector } from '~/components/sudoku/DifficultySelector';
import { generateSudoku, isValid } from '~/lib/sudoku';

const Game: React.FC = () => {
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [initialBoard, setInitialBoard] = useState<SudokuBoard>([]);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isComplete, setIsComplete] = useState(false);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isComplete) {
        setTime((t) => t + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate the board when the component mounts or difficulty changes
  useEffect(() => {
    const newBoard = generateSudoku(difficulty);
    setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    setBoard(newBoard);
    setErrors({});
  }, [difficulty]);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setTime(0);
    setMoves(0);
  };

  const checkCompletion = (board: SudokuBoard) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0 || errors[`${i}-${j}`]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    if (initialBoard[row][col] !== 0) return;
    setMoves((m) => m + 1);

    const newBoard = board.map((row) => [...row]);
    const newErrors = { ...errors };

    if (value === 0 || isValid(newBoard, row, col, value)) {
      newBoard[row][col] = value;
      delete newErrors[`${row}-${col}`];

      // Check if game is complete after valid move
      if (checkCompletion(newBoard)) {
        setIsComplete(true);
      }
    } else {
      newErrors[`${row}-${col}`] = true;
    }

    setBoard(newBoard);
    setErrors(newErrors);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-4 flex gap-8 text-sm'>
        <div>Time: {formatTime(time)}</div>
        <div>Moves: {moves}</div>
      </div>
      {isComplete && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='rounded-lg bg-white p-6 text-center'>
            <h2 className='mb-4 text-2xl font-bold'>Congratulations! 🎉</h2>
            <p>You've completed the puzzle!</p>
            <button
              className='mt-4 rounded bg-sky-500 px-4 py-2 text-white hover:bg-sky-600'
              onClick={() => {
                setIsComplete(false);
                setTime(0);
                setMoves(0);
                setDifficulty(difficulty); // This will generate a new puzzle
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <DifficultySelector
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      <SudokuBoard
        board={board}
        initialBoard={initialBoard}
        errors={errors}
        onCellChange={handleCellChange}
      />
    </div>
  );
};

export { Game };
