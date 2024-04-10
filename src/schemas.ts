import { z } from 'zod';
export const contactSchema = z.object({
  handler: z.string().min(3).max(50),
  message: z.string().min(10).max(500),
});
