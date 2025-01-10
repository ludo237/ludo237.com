import { Metadata } from 'next';
import { FC } from 'react';
import { Header } from '~/components/header';
import { LoginForm } from '~/components/login-form';
import { Game } from '~/components/sudoku/game';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { supabaseClient } from '~/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Ludo237 | Sudoku',
  description:
    'Simple sudoku board that reflects the classic game, which i like a lot.',
};

const SignupCta = () => {
  return (
    <>
      <span>
        Simple sudoku board that reflects the classic game, which i like a lot.
        Do you want to keep track of your scores?
      </span>{' '}
      <Dialog>
        <DialogTrigger asChild>
          <span className='text-sky-500 underline'>Login or Register</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register or create a new account</DialogTitle>
            <DialogDescription>
              What, another account? I know I hate them too, but certain
              functionalities can only work with some sort of authentication. I
              can promise you I will never ever ever use your email for anything
              else beside log you in my app, I make enough money I don't need to
              sell my data to third parties!
            </DialogDescription>
          </DialogHeader>

          <LoginForm revalidateFrom='sudoku' />
        </DialogContent>
      </Dialog>
    </>
  );
};

const SudokuGame: FC = async () => {
  const supabase = await supabaseClient();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <Header />

      <main className='mx-auto max-w-lg'>
        <div className='mb-8 w-full text-center'>
          <h1 className='text-3xl font-semibold'>Sudoku</h1>
          <p className='text-sm'>
            {!data && <SignupCta />}
            {data && <>Welcome back {data.user?.id}</>}
          </p>
        </div>

        <Game user={data.user} />
      </main>
    </>
  );
};

export default SudokuGame;
