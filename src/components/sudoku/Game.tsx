'use client';

import { PartyPopper } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SudokuBoard } from '~/components/sudoku/Board';
import { DifficultySelector } from '~/components/sudoku/DifficultySelector';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/Alert';
import { Button } from '~/components/ui/Button';
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
    // Check for empty cells or cells with errors
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0 || errors[`${i}-${j}`]) {
          return false;
        }
      }
    }

    // Check rows
    for (let row = 0; row < 9; row++) {
      const seen = new Set();
      for (let col = 0; col < 9; col++) {
        if (seen.has(board[row][col])) return false;
        seen.add(board[row][col]);
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const seen = new Set();
      for (let row = 0; row < 9; row++) {
        if (seen.has(board[row][col])) return false;
        seen.add(board[row][col]);
      }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const seen = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const value = board[boxRow + i][boxCol + j];
            if (seen.has(value)) return false;
            seen.add(value);
          }
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
      <div className='flex flex-col items-center justify-center space-y-6'>
        <div className='flex space-x-3 text-sm'>
          <p>Time: {formatTime(time)}</p>
          <Separator orientation='vertical' />
          <p>Moves: {moves}</p>
        </div>

        {isComplete && (
          <Alert>
            <PartyPopper className='size-5' />
            <AlertTitle>Congratulations!</AlertTitle>
            <AlertDescription>
              <p>
                You finished the board in {formatTime(time)} minutes with{' '}
                {moves} moves!
              </p>
              <div className='flex w-full items-center justify-end'>
                <Button
                  size='xs'
                  onClick={() => handleDifficultyChange(difficulty)}
                >
                  Play again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        {!isComplete && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export { Game };
