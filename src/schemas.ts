import { z } from 'zod';
export const contactSchema = z.object({
  handler: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});
