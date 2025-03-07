import type {Metadata} from 'next';
import type {FC} from 'react';
import {Header} from '~/components/sections/header';
import {Game} from '~/components/sudoku/game';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Ludo237 | Sudoku',
  description:
    'Simple sudoku board that reflects the classic game, which i like a lot.',
};

const SudokuGame: FC = async () => {
  return (
    <main className='mx-auto max-w-2xl'>
      <Header />

      <Breadcrumb className='py-3'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sudoku</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mx-auto max-w-lg'>
        <Game />
      </div>
    </main>
  );
};

export default SudokuGame;
