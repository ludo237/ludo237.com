import { FC } from 'react';
import { Game } from '~/components/sudoku/game';

const SudokuGame: FC = () => {
  return (
    <main className='mx-auto max-w-lg'>
      <div className='mb-8 w-full text-center'>
        <h1 className='text-3xl font-semibold'>Sudoku</h1>
        <p className='text-sm'>
          Simple sudoku board that reflects the classic game, which i like a lot
        </p>
      </div>

      <Game />
    </main>
  );
};

export default SudokuGame;
