'use client';

import React, { useEffect, useState } from 'react';
import { SudokuBoard } from '~/components/sudoku/Board';
import { DifficultySelector } from '~/components/sudoku/DifficultySelector';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/AlertDialog';
import { Separator } from '~/components/ui/Separator';
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
    <>
      <AlertDialog defaultOpen={isComplete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have completed the puzzle!</AlertDialogTitle>
            <AlertDialogDescription>
              Good job, it tooke you {time} and {moves} moves to complete this
              Sudoku in {difficulty} mode
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='flex flex-col items-center justify-center space-y-6'>
        <div className='flex space-x-3 text-sm'>
          <p>Time: {formatTime(time)}</p>
          <Separator orientation='vertical' />
          <p>Moves: {moves}</p>
        </div>

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
    </>
  );
};

export { Game };
