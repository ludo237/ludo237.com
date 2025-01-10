'use server';
import { User } from '@supabase/supabase-js';
import { db } from '~/database';
import { sudokusTable } from '~/schema';

export const addGame = async (
  user: User,
  moves: number,
  time: number,
  difficulty: string
) => {
  try {
    return await db.insert(sudokusTable).values({
      userId: user.id,
      moves,
      time,
      difficulty,
    });
  } catch (e: any) {
    console.log('Could not insert sudoku game for user: ' + user.id);
  }
};
