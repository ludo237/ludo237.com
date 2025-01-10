'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { supabaseClient } from '~/lib/supabase/server';
import { loginSchema } from '~/schemas';

export const login = async (
  data: z.infer<typeof loginSchema>,
  revalidateFrom: string
) => {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error;
  }

  revalidatePath(revalidateFrom, 'layout');
};

export const logout = async () => {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return error;
  }

  revalidatePath('/', 'layout');
};
