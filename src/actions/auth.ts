'use server';

import { revalidatePath } from 'next/cache';
import type { z } from 'zod';
import { supabaseClient } from '~/lib/supabase/server';
import type { loginSchema } from '~/schemas';

export const login = async (
  data: z.infer<typeof loginSchema>,
  revalidateFrom: string
) => {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  revalidatePath(revalidateFrom, 'layout');
};

export const logout = async () => {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath('/', 'layout');
};
