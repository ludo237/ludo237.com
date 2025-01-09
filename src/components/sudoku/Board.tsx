import React from 'react';
import { Cell } from '~/components/sudoku/Cell';

interface SudokuBoardProps {
  board: SudokuBoard;
  initialBoard: SudokuBoard;
  errors: { [key: string]: boolean };
  onCellChange: (row: number, col: number, value: number) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  initialBoard,
  errors,
  onCellChange,
}) => {
  return (
    <div className='inline-block border-2 border-black'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='flex'>
          {row.map((value, colIndex) => {
            const borderRight =
              (colIndex + 1) % 3 === 0 && colIndex < 8
                ? 'border-r-2 border-r-black'
                : '';
            const borderBottom =
              (rowIndex + 1) % 3 === 0 && rowIndex < 8
                ? 'border-b-2 border-b-black'
                : '';

            return (
              <Cell
                key={colIndex}
                value={value}
                readOnly={initialBoard[rowIndex][colIndex] !== 0}
                hasError={errors[`${rowIndex}-${colIndex}`] || false}
                onChange={(newValue) =>
                  onCellChange(rowIndex, colIndex, newValue)
                }
                borderRight={borderRight}
                borderBottom={borderBottom}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export { SudokuBoard };
