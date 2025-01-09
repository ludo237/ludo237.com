import { Metadata } from 'next';
import { FC } from 'react';
import { Header } from '~/components/header';
import { Game } from '~/components/sudoku/game';

export const metadata: Metadata = {
  title: 'Ludo237 | Sudoku',
  description:
    'Simple sudoku board that reflects the classic game, which i like a lot.',
};

const SudokuGame: FC = () => {
  return (
    <>
      <Header />

      <main className='mx-auto max-w-lg'>
        <div className='mb-8 w-full text-center'>
          <h1 className='text-3xl font-semibold'>Sudoku</h1>
          <p className='text-sm'>
            Simple sudoku board that reflects the classic game, which i like a
            lot
          </p>
        </div>

        <Game />
      </main>
    </>
  );
};

export default SudokuGame;
