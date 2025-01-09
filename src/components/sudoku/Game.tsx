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

  // Generate the board when the component mounts or difficulty changes
  useEffect(() => {
    const newBoard = generateSudoku(difficulty);
    setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    setBoard(newBoard);
    setErrors({});
  }, [difficulty]);

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    if (initialBoard[row][col] !== 0) return;

    const newBoard = board.map((row) => [...row]);
    const newErrors = { ...errors };

    if (value === 0 || isValid(newBoard, row, col, value)) {
      newBoard[row][col] = value;
      delete newErrors[`${row}-${col}`];
    } else {
      newErrors[`${row}-${col}`] = true;
    }

    setBoard(newBoard);
    setErrors(newErrors);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
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
